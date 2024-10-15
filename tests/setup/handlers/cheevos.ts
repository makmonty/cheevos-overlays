import { cheevosBaseUrl } from '@/utils/config';
import { queryStringToParams } from '@/utils/url';
import { http, HttpResponse, type HttpResponseResolver } from 'msw';
import { progress } from 'tests/mocks/progress';
import { userSummary } from 'tests/mocks/userSummary';

export const withAuth = (resolver: HttpResponseResolver<never, any, any>) => {
  return async (input: any) => {
    const { request } = input;
    const query = queryStringToParams(request.url.split('?')[1]);
    if (!query.y) {
      return HttpResponse.json(
        {
          message: 'Unauthenticated.',
          errors: [
            {
              status: 419,
              code: 'unauthorized',
              title: 'Unauthenticated.'
            }
          ]
        },
        {
          status: 401
        }
      );
    }

    return resolver(input);
  };
};

export const handlers = [
  http.get(
    `${cheevosBaseUrl}/API/API_GetGameInfoAndUserProgress.php`,
    withAuth(() => HttpResponse.json(progress))
  ),
  http.get(
    `${cheevosBaseUrl}/API/API_GetUserSummary.php`,
    withAuth(() => HttpResponse.json(userSummary))
  )
];
