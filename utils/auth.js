// auth.js

// Client-side authentication helper
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Auth = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    return {
        isLoggedIn: function() {
            return sessionStorage.getItem('isLoggedIn') === 'true';
        },
        
        login: function(userId) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userId', userId);
        },
        
        logout: function() {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userId');
        },
        
        getUserId: function() {
            return sessionStorage.getItem('userId');
        }
    };
}));

// Server-side authentication middleware
const userAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    } else {
        req.user_id = req.session.user_id;
        next();
    }
};

// Export both client-side and server-side auth
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Auth: module.exports, // Client-side Auth object
        userAuth: userAuth // Server-side middleware
    };
}