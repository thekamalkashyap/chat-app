import { useEffect, useState } from 'react';

export default function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
    });
  }, []);

  return (
    <button
      id="installApp"
      className={` ${!deferredPrompt && 'hidden'} bg-[#414141] rounded-lg px-1`}
      onClick={async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome == 'accepted') {
            setDeferredPrompt(null);
          }
        }
      }}
    >
      Install App
    </button>
  );
}
