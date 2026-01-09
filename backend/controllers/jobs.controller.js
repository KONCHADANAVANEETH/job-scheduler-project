const db = require('../db');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


exports.createJob = (req, res) => {
  const { taskName, payload, priority } = req.body;


  if (!taskName || !priority) {
    return res.status(400).json({
      error: 'taskName and priority are required'
    });
  }

  const status = 'pending';
  const payloadString = payload ? JSON.stringify(payload) : '{}';

  const insertQuery = `
    INSERT INTO jobs (taskName, payload, priority, status)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [taskName, payloadString, priority, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(201).json({
        message: 'Job created successfully',
        jobId: this.lastID
      });
    }
  );
};

exports.getJobs = (req, res) => {
  const { status, priority } = req.query;

  let baseQuery = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (status) {
    baseQuery += ' AND status = ?';
    params.push(status);
  }

  if (priority) {
    baseQuery += ' AND priority = ?';
    params.push(priority);
  }

  baseQuery += ' ORDER BY createdAt DESC';

  db.all(baseQuery, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(rows);
  });
};

exports.getJobById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM jobs WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.json(row);
  });
};

exports.runJob = async (req, res) => {
  const { id } = req.params;


  const findQuery = 'SELECT * FROM jobs WHERE id = ?';

  db.get(findQuery, [id], (err, job) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }


    if (job.status === 'running' || job.status === 'completed') {
      return res.status(400).json({
        message: `Job already ${job.status}`
      });
    }


    const updateToRunning = `
      UPDATE jobs
      SET status = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(updateToRunning, ['running', id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }


      res.json({ message: 'Job started' });


      setTimeout(() => {
        const updateToCompleted = `
          UPDATE jobs
          SET status = ?, completedAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP
          WHERE id = ?
        `;

        db.run(updateToCompleted, ['completed', id], (err) => {
        if (err) {
            return console.error('Error completing job', err.message);
        }

        const fetchJobQuery = 'SELECT * FROM jobs WHERE id = ?';

        db.get(fetchJobQuery, [id], async (err, completedJob) => {
            if (err) {
            return console.error('Error fetching completed job', err.message);
            }

            const webhookPayload = {
            jobId: completedJob.id,
            taskName: completedJob.taskName,
            priority: completedJob.priority,
            payload: JSON.parse(completedJob.payload),
            completedAt: completedJob.completedAt
            };

            try {
            const response = await fetch(process.env.WEBHOOK_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(webhookPayload)
            });

            console.log('Webhook triggered successfully:', response.status);
            } catch (error) {
            console.error('Webhook failed:', error.message);
            }
        });
        });

      }, 3000);
    });
  });
};

