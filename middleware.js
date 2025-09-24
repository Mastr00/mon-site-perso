// Protect selected routes via Auth0's Edge middleware (optional – we also protect via GSSP)
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

// Only match these routes
export const config = {
  matcher: ['/dashboard']
};