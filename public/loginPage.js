"use strict";

// Create Object
const userForm = new UserForm();

// Login
userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, function(response) {
        console.log('Login response:', response);
        if (response.success) {
            location.reload();
        } else {
            alert(`Login failed: ${response.error}`);
        }
    });
};

// Registration
userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, function(response) {
        console.log('Registration response:', response);
        if (response.success) {
            location.reload();
        } else {
            alert(`Registration failed: ${response.error}`);
        }
    });
};
