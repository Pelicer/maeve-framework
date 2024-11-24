import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";

import { CursorContentProvider } from "@/context/cursorContentContext";
import { ModalProvider } from "@/context/modalContext";
import { ScrollTargetProvider } from "@/context/scrollTargetContext";
import { SettingsProvider } from "@/context/settingsContext";
import { SoundEffectsProvider } from "@/context/soundEffectsContext";
import { BackgroundAnimationProvider } from "@/context/backgroundAnimationContext";
import { WordCloudProvider } from "@/context/wordCloudContext";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

const MyApp = ({ Component, pageProps }) => {

  datadogRum.init({
    applicationId: 'f7773961-fefe-4d80-ba18-83656ddf6abc',
    clientToken: 'pub6ca5cd1b818659a0d6e82a0baf606459',
    site: 'datadoghq.eu',
    service:'react-datadog-poc',
    env:'dev',
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'allow'
  });
  
  datadogLogs.init({
      clientToken: 'pub6ca5cd1b818659a0d6e82a0baf606459',
      site: 'datadoghq.eu',
      forwardErrorsToLogs: true,
      forwardConsoleLogs: "all",
      forwardReports: "all",
        sessionSampleRate: 100
  });
  datadogRum.startSessionReplayRecording();
  
  return (
    <div>
      <SoundEffectsProvider>
        <BackgroundAnimationProvider>
          <ModalProvider>
            <ScrollTargetProvider>
              <SettingsProvider>
                <CursorContentProvider>
                  <WordCloudProvider>
                    <>
                      <DefaultSeo
                        openGraph={{
                          type: "website",
                          title: "Djow Software Engineer",
                          description:
                            "Giovani's website portfolio showcasing experiences and projects, with expertise focused in front-end technologies.",
                          images: [
                            {
                              url: "https://i.imgur.com/4B8SadM.png",
                              width: 300,
                              height: 300,
                              alt: "Djow Software Engineer Portfolio Logo",
                            },
                          ],
                          locale: "en_IE",
                          url: "https://www.djow.dev/",
                          siteName: "Djow.dev",
                        }}
                      />
                      <Component {...pageProps} />
                      <Analytics />
                    </>
                  </WordCloudProvider>
                </CursorContentProvider>
              </SettingsProvider>
            </ScrollTargetProvider>
          </ModalProvider>
        </BackgroundAnimationProvider>
      </SoundEffectsProvider>
    </div>
  );
};

export default MyApp;
