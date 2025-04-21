import pool from "../db/index.js";

export const createGroup = async (req, res) => {
    const {name, emails } = req.body;
    const creatorId = req.user.id;
    console.log('creatorId', creatorId);

    if(!name || !Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ error: "Please fill all fields" });
    }
    try{
      console.log('inside try block');
        const grpRes = await pool.query('insert into groups (name, created_by) values ($1, $2) returning id',[name, creatorId])
        console.log(grpRes.rows[0]);

        const groupId = grpRes.rows[0].id;
        console.log('groupId', groupId);
        const cleanEmails = [...new Set([...emails.map(e => e.trim().toLowerCase()), req.user.email])]
        const placeholders = cleanEmails.map((_, i) => `$${i + 1}`).join(', ')
        const usersRes = await pool.query(
            `SELECT id FROM users WHERE email IN (${placeholders})`,
            cleanEmails
          )
          const userIds = usersRes.rows.map(row => row.id)
          const insertPromises = userIds.map((uid) =>
            pool.query(
              `INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
              [groupId, uid]
            )
          )
          await Promise.all(insertPromises)
      
          res.status(201).json({ message: 'Group created successfully', groupId })


    }
    catch(err){
        return res.status(500).json({ error: "Error creating group" });
    }
}

export const addGroupMembers = async (req, res) => {
  const { groupId } = req.params
  const { emails } = req.body

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ message: 'Emails are required to add members' })
  }

  try {
    const cleanEmails = [...new Set(emails.map(e => e.trim().toLowerCase()))]
    const placeholders = cleanEmails.map((_, i) => `$${i + 1}`).join(', ')

    const usersRes = await pool.query(
      `SELECT id FROM users WHERE email IN (${placeholders})`,
      cleanEmails
    )
    const userIds = usersRes.rows.map(row => row.id)

    const insertPromises = userIds.map((uid) =>
      pool.query(
        `INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [groupId, uid]
      )
    )
    await Promise.all(insertPromises)

    res.status(200).json({ message: 'Members added to group successfully' })
  } catch (err) {
    console.error('Error adding group members:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
