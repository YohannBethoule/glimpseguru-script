# GlimpseGuru Web Tracker Script

GlimpseGuru Web Tracker is a lightweight, easy-to-integrate JavaScript-based tool designed to collect and analyze web metrics for your development projects. It enables real-time tracking of page views, session ends, custom events, and more, providing insights into user interactions on your websites.


## Features

**Page View Tracking**: Automatically tracks each page view, capturing details such as URL, referrer, and device type. 

**Session Tracking**: Monitors the start and end of a user session, with automatic session ID management.

**Custom Event Tracking**: Allows for custom events to be tracked, providing flexibility in capturing specific user interactions.

**Device and Source Type Detection**: Identifies whether a user is on a mobile or desktop device and classifies traffic sources (e.g., direct, referral, search).

**URL Change Detection**: Listens to history and hash changes in the browser, ensuring single-page applications (SPAs) accurately track page views.


## Getting Started

To integrate GlimpseGuru Web Tracker into your website, follow these steps:

### Configuration

Embed the provided script into your website. Ensure it's loaded before any other script tags that you want to track.

You can either copy your own version of the script from this repository, or download it from https://cdn.jsdelivr.net/gh/YohannBethoule/glimpseguru-script@master/glimpseguru.min.js

This script utilizes localStorage for session management and XMLHttpRequest for sending data to the specified endpoint. Ensure CORS policies on your server allow requests from your domain.

### Initialize Tracker:
Configure the tracker with your unique API Key and Website ID. Those need to be in the used database. 
Optionally, you can override the default tracker URL.

```javascript
window.configureTracker('YOUR_API_KEY', 'YOUR_WEBSITE_ID', 'TRACKER_URL (optional)');
```

### Track Custom Events:
You can track custom events anywhere in your application by calling:

```javascript
window.trackCustomEvent('event_label', { additionalData: 'any_value' });
```

Replace 'event_label' with your custom event name, and { additionalData: 'any_value' } with any additional data you want to attach to the event.


## Usage Examples


### Using vanilla JavaScript:

#### Initial Setup:

```html
<html>
<body>
    <!--... your html page -->
    <script type="module">
        function configureScript() {
            if (typeof window.configureTracker === 'function') {
                window.configureTracker('your_api_key', 'your_website_id', "you_tracker_url");
            }
        }
    
        const trackerScript = document.createElement('script');
        trackerScript.src = "https://cdn.jsdelivr.net/gh/YohannBethoule/glimpseguru-script@master/glimpseguru.min.js";
        trackerScript.defer = true;
        trackerScript.onload = configureScript;
        document.head.appendChild(trackerScript);
    </script>
</body>
</html>
```

#### Tracking Custom Events:

```javascript
    document.getElementById('load-btn').addEventListener('click', () => {
        // ... loading things
        if (typeof window.trackCustomEvent === 'function') {
            window.trackCustomEvent('load', {button_id: 'load-btn'});
        }
    });
```


### Using vue.js:

#### Initial Setup:

In your App.vue component : 
```typescript
<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
    function configureScript() {
        if (typeof window.configureTracker === 'function') {
            window.configureTracker(import.meta.env.VITE_TRACKER_API_KEY, import.meta.env.VITE_TRACKER_WEBSITE_ID, import.meta.env.VITE_TRACKER_URL)
        }
    }

    const trackerScript = document.createElement('script');
    trackerScript.src = "https://cdn.jsdelivr.net/gh/YohannBethoule/glimpseguru-script@master/glimpseguru.min.js";
    trackerScript.defer = true;
    trackerScript.onload = configureScript;
    document.head.appendChild(trackerScript);
})
</script>
```

#### Tracking Custom Events:

Same usage as vanilla JavaScript.


## Troubleshooting

Tracking Not Working:
Verify that the API key and Website ID are correctly set. Check the browser console for any errors related to the tracking requests.

Custom Events Not Tracking:
Ensure the trackCustomEvent function is called after the tracker has been configured with configureTracker.


## Contributing

We welcome contributions and suggestions to improve the GlimpseGuru Web Tracker. Please submit issues or pull requests to our GitHub repository.

