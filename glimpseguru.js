(function() {
    var TRACKER_API_KEY = ''; // User will set this
    var TRACKER_WEBSITE_ID = ''; // User will set this
    var TRACKER_URL = 'https://glimpseguru-tracker.fly.dev';

    window.configureTracker = function(apiKey, websiteId, trackerUrl = '') {
        TRACKER_API_KEY = apiKey;
        TRACKER_WEBSITE_ID = websiteId;
        if (trackerUrl.length > 0) {
            TRACKER_URL = trackerUrl;
        }
        trackPageView(); // Track the initial page view
        listenToUrlChanges(); // Start listening to URL changes
    };

    function getSessionID() {
        const sessionData = localStorage.getItem('trackingSession');
        if (sessionData) {
            const session = JSON.parse(sessionData);
            if (new Date().getTime() < session.expiry) {
                return session.id;
            }
        }
        return setSessionID();
    }

    function setSessionID() {
        const sessionId = generateUUID();
        const expiry = new Date().getTime() + (60 * 60 * 1000); // 1 hour from now
        localStorage.setItem('trackingSession', JSON.stringify({ id: sessionId, expiry: expiry }));
        return sessionId;
    }

    function generateUUID() { // Simple UUID generator
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getDeviceType() {
        var ua = navigator.userAgent;
        if (/mobile/i.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }

    function getSourceType() {
        const referrer = document.referrer;
        if (!referrer) {
            return 'direct';
        }
        if (referrer.indexOf(location.hostname) !== -1) {
            return 'internal';
        }
        if (/google|bing|yahoo|duckduckgo/.test(referrer)) {
            return 'search';
        }
        return 'referral';
    }

    function trackPageView() {
        var data = {
            page_url: window.location.href,
            referrer_url: document.referrer,
            timestamp: Math.floor(Date.now() / 1000),
            session_id: getSessionID(),
            device_type: getDeviceType(),
            source_type: getSourceType()
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${TRACKER_URL}/track/pageview`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-API-Key', TRACKER_API_KEY);
        xhr.setRequestHeader('X-Website-ID', TRACKER_WEBSITE_ID);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    console.error('Tracking request failed: ', xhr.status, xhr.responseText);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    function listenToUrlChanges() {
        var pushState = history.pushState;
        history.pushState = function() {
            pushState.apply(history, arguments);
            trackPageView();
        };

        // Listen to Hash changes
        window.addEventListener('hashchange', trackPageView);
    }
})();