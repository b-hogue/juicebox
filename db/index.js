const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/juicebox-dev');

async function createUser({ 
    username, 
    password,
    name,
    location
  }) {
    try {
      const { rows } = await client.query(`
        INSERT INTO users(username, password, name, location) 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `, [username, password, name, location]);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }
  async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }
  
  async function getAllPosts() {
    try {
     const { rows } = await client.query(
        `SELECT id, post 
        FROM posts;
      `
      );
      return rows;    
    } catch (error) {
      throw error;
    }
  }

  async function getPostsByUser(userId) {
    try {
      const { rows } = client.query(`
        SELECT * FROM posts
        WHERE "authorId"=${ userId };
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getUserById(userId) {
    try {
        const { rows } = client.query(`
        SELECT * FROM users
        WHERE "id" =${ userId };
        `)
        return rows;
    }
        catch (error) {
            throw error;
        }
    }

  

  async function createPost({
    authorId,
    title,
    content
  }) {
    try {
        const { rows } = await client.query(`
        INSERT INTO posts(authorId, title, content)
        VALUES($1, $2, $3)
        RETURNING *;
        `, [authorId, title, content]);
    } catch (error) {
      throw error;
    }
  }

  async function updatePost(id, 
    fields = {}
  ) {
        // build the set string
        const setString = Object.keys(fields).map(
          (key, index) => `"${ key }"=$${ index + 1 }`
        ).join(', ');
      
        // return early if this is called without fields
        if (setString.length === 0) {
          return;
        }
      
        try {
          const result = await client.query(`
            UPDATE post
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
          `, Object.values(fields));
      
          return result;
        } catch (error) {
          throw error;
        }
      }

  module.exports = {
    client,
    getAllUsers,
    createUser,
    createPost,
    getAllPosts,
    getPostsByUser,
    getUserById,
    updatePost
}