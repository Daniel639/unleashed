// router.js

class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('root');
        window.addEventListener('popstate', this.handlePopState.bind(this));
        this.initialize();
    }

    initialize() {
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });

        this.handlePopState();
    }

    handlePopState() {
        const path = window.location.pathname;
        this.loadRoute(path);
    }

    async loadRoute(url) {
        const route = this.routes.find(r => r.path === url) || this.routes.find(r => r.path === '*');
        
        if (route) {
            try {
                const view = await route.view();
                this.rootElem.innerHTML = view;
            } catch (error) {
                console.error('Error loading view:', error);
                this.rootElem.innerHTML = '<p>Error loading page</p>';
            }
        } else {
            this.rootElem.innerHTML = '<p>404 - Page not found</p>';
        }
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute(url);
    }
}

// Define your routes
const routes = [
    { path: '/', view: () => fetch('/').then(res => res.text()) },
    { path: '/home', view: () => fetch('/home').then(res => res.text()) },
    { path: '/about', view: () => fetch('/about').then(res => res.text()) },
    { path: '/user-profile', view: () => fetch('/user-profile').then(res => res.text()) },
    // Add more routes as needed
    { path: '*', view: () => '<p>404 - Page not found</p>' }
];

// Initialize the router
window.router = new Router(routes);
