import { http, HttpResponse } from 'msw';

import { handlers as cheevosHandlers } from './cheevos';

// const debugHandlers = [
//   http.get('*', (args) => {
//     const { params, request } = args
//     console.log('HTTP request', request.url, params)
//   }),
// ]

const defaultHandlers = [
  http.get('*', (args) => {
    const { params, request } = args;
    console.log('Unhandled HTTP request', request.url, params);
    return new HttpResponse(null, { status: 200 });
  })
];

export const handlers = [
  // ...debugHandlers,
  ...cheevosHandlers,
  ...defaultHandlers
];
