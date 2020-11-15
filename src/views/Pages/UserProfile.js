var UserProfile = (function () {
  var role = "";
  var username = "";

  var getRole = function () {
    return role; // Or pull this from cookie/localStorage
  };

  var getUsername = function () {
    return username; // Or pull this from cookie/localStorage
  };

  var setRole = function (name) {
    role = name;
    // Also set this in cookie/localStorage
  };

  var setUsername = function (uname) {
    username = uname;
    // Also set this in cookie/localStorage
  };

  return {
    getRole: getRole,
    setRole: setRole,
    getUsername: getUsername,
    setUsername: setUsername,
  };
})();

export default UserProfile;
