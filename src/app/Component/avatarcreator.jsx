'use client';

import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent
} from '@readyplayerme/react-avatar-creator';
import { useState } from 'react';
import AvatarUrlModal from './avatarurlmodal';

const config = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

export default function AvatarsCreator() {
  const [avatarUrl, setAvatarUrl] = useState('');


  const handleOnAvatarExported = (event) => {
    console.log('Avatar Export Event:', event);
    setAvatarUrl(event?.data?.url || '');
  };

  // const showAlert = () => {
  //   alert(avatarUrl ? `Avatar URL: ${avatarUrl}` : 'No avatar URL available');
  // };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#15161f',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
      }}
    >
      <div style={{ width: '100%' }}>
        <AvatarCreator
          // subdomain="react-app-avatar"
          subdomain="demo"
          config={config}
          style={{ width: '100%', height: '100vh', marginBottom: '10px', }}
          onAvatarExported={handleOnAvatarExported}
        />
      </div>
      <AvatarUrlModal avatarUrl={avatarUrl} />
    </div>
  );
}