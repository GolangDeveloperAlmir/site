'use client';

// Guarded Faro initialization to avoid runtime errors when env vars are missing
let faro: any = undefined;

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FARO_URL) {
  const { initializeFaro, getWebInstrumentations } = require('@grafana/faro-web-sdk');
  const { TracingInstrumentation } = require('@grafana/faro-web-tracing');

  faro = initializeFaro({
    url: process.env.NEXT_PUBLIC_FARO_URL,
    app: {
      name: process.env.NEXT_PUBLIC_FARO_APP_NAME ?? 'almir-site',
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? 'dev',
      namespace: 'personal-site'
    }
  });

  faro.instrumentations.add(
    getWebInstrumentations({
      captureConsole: true,
      instrumentations: [new TracingInstrumentation()]
    })
  );

  faro.api.setUser({ id: 'anon' });
}

export default faro;
