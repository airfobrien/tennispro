import type { PostConfirmationTriggerEvent, PostConfirmationTriggerHandler } from 'aws-lambda';

/**
 * Cognito Post-Confirmation Lambda Trigger
 *
 * This Lambda is triggered after a user confirms their signup (email verification).
 * It creates a corresponding Coach record in the database.
 *
 * Event payload includes:
 * - userPoolId: The user pool ID
 * - userName: Cognito username (usually email)
 * - request.userAttributes: User attributes from Cognito
 *   - sub: Cognito user ID
 *   - email: User email
 *   - name: Full name
 *   - custom:coach_id: Will be set after coach creation
 */

// Note: In production, this would use Prisma client or direct SQL
// For now, we're using placeholder logic that will be connected when
// the Lambda is deployed with proper VPC access to Aurora

interface CoachCreateInput {
  cognitoUserId: string;
  email: string;
  name: string;
  slug: string;
}

async function createCoach(input: CoachCreateInput): Promise<string> {
  // TODO: Connect to Aurora via RDS Proxy and create coach record
  // For now, return a placeholder ID
  console.log('Creating coach:', input);

  // In production, this would be:
  // const coach = await prisma.coach.create({
  //   data: {
  //     cognitoUserId: input.cognitoUserId,
  //     email: input.email,
  //     name: input.name,
  //     slug: input.slug,
  //     tier: 'starter',
  //   },
  // });
  // return coach.id;

  // Placeholder - return a UUID
  return crypto.randomUUID();
}

function generateSlug(name: string, email: string): string {
  // Generate a URL-friendly slug from name
  // Add some uniqueness from email to avoid collisions
  const nameSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const emailPrefix = email.split('@')[0]?.slice(0, 4) ?? '';
  const uniqueSuffix = Math.random().toString(36).substring(2, 6);

  return `${nameSlug}-${emailPrefix}${uniqueSuffix}`;
}

export const handler: PostConfirmationTriggerHandler = async (
  event: PostConfirmationTriggerEvent
) => {
  console.log('Post-confirmation trigger event:', JSON.stringify(event, null, 2));

  // Only process on ConfirmSignUp trigger
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    console.log('Skipping - not a ConfirmSignUp trigger');
    return event;
  }

  const { userAttributes } = event.request;
  const cognitoUserId = userAttributes.sub;
  const email = userAttributes.email;
  const name = userAttributes.name || email.split('@')[0] || 'Coach';

  if (!cognitoUserId || !email) {
    console.error('Missing required user attributes');
    return event;
  }

  try {
    const slug = generateSlug(name, email);

    const coachId = await createCoach({
      cognitoUserId,
      email,
      name,
      slug,
    });

    console.log(`Created coach with ID: ${coachId} for user: ${cognitoUserId}`);

    // Note: To update Cognito custom attributes, you would use the
    // AdminUpdateUserAttributes API. This requires the Lambda to have
    // the cognito-idp:AdminUpdateUserAttributes permission.
    //
    // For now, the coach_id will be fetched from the database when needed.
    // A more robust solution would update the Cognito user attributes here.
  } catch (error) {
    console.error('Error creating coach:', error);
    // Don't throw - we don't want to block the user signup
    // The coach record can be created on first login if needed
  }

  return event;
};
