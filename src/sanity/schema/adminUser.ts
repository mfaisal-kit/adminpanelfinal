export const adminUserSchema = {
    name: 'adminUser',
    title: 'Admin User',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
       
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
       
      },
    ],
}