# Makarov Michael, M33061
Project is **Personal Blog**


## Database ERD description
ERD is presented at /db_erd.png.

### General
The selected subject "personal blog" supposes that there are some posts and comments on the website. The suggested database structure allows me to add this functionality.

### users_groups
The list of available users groups. It is supposed that there are only 2 groups on the website:

- 0 - admin. Could add/remove posts, add/remove comments, add/block/delete/restore users;
- 1 - user. Could add/remove comments.

### users
The list of all users.

- id - user's id;
- username - user's username;
- password - user's hashed password;
- is_active - flag to display if user is banned or not;
- group (FK) - user's group

### user_contacts
An extension table to the `users` table. All of the fields in this table are nullable.

- id - contact id;
- user_id (FK) - user id;
- email - user's email;
- phone - user's phone;
- phone2 - (not necessary);
- address - user's physical address.

### posts
A table that stores posts.

- id - post id
- picture_link (nullable) - a link to the post's picture;
- title - post's title;
- link - reference to the post's body (internally stored in the json)
- date - post's creation date;
- author_id (FK) - post's author id.

### comments
A table that stores comments.

- id - comment id;
- post (FK) - related post id;
- author (FK) - author id;
- date - creation date;
- text - comment text.