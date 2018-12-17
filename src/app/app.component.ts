import { Component } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor() {
    let deferredPrompt: any;

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            // Note: Chrome 67 and earlier showed an "Add to home screen" banner. It was removed in Chrome 68.
            console.log('beforeinstallprompt !!!');
            e.preventDefault();
            deferredPrompt = e;

            const addtaoHomeBtn = document.querySelector('.addToHomeBtn-prompt');
            addtaoHomeBtn.addEventListener('click', () => {
                // Show the prompt
                console.log('Clicked !!!');
                deferredPrompt.prompt();
                console.log('Deferred Prompt');
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice
                  .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the A2HS prompt');
                    } else {
                      console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                  });
              });
        });

        window.addEventListener('appinstalled', () => {
            console.log('Add to Home screen sucessfully installed');
        });

        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('display-mode is standalone');
        }

    }

}
