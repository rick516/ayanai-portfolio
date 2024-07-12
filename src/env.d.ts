/// <reference types="vite/client" />

interface ImportMetaEnv {
  REACT_APP_EMAILJS_SERVICE_ID: string;
  REACT_APP_EMAILJS_TEMPLATE_ID: string;
  REACT_APP_EMAILJS_USER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}