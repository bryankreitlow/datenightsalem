Accounts.onCreateUser(function(options, user) {
  user.role = 'user';
  return user;
});