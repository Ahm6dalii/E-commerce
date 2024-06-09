import React, { useEffect, useState } from 'react'
import style from './LoadingScreen.module.css'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import '@dotlottie/player-component';

export default function LoadingScreen() {
  
  return (
    <div className=' py-8 flex justify-center items-center'>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
<dotlottie-player src="https://lottie.host/c22ed51b-7f64-4717-9967-801e7808f978/pGfiWOcyMx.json" background="transparent" speed="1" style={{width: 300 +'px', height: 300 +'px'}} direction="1" playMode="normal" loop  autoplay></dotlottie-player>
    </div>
  )
}
