import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost/hls/streams/master.m3u8');
  if (res.status !== 200) {
    console.error(`Failed to fetch video stream: ${res.status}`);
  }
  sleep(1);
}
