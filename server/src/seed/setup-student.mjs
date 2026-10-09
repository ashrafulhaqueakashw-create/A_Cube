import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/acube-academy');
  const hashedPassword = await bcrypt.hash('StudentPass123!', 12);
  
  await mongoose.connection.collection('users').updateOne(
    { email: 'student@acube.academy' },
    {
      $set: {
        name: 'Demo Student',
        email: 'student@acube.academy',
        phone: '01711223344',
        password: hashedPassword,
        role: 'student',
        status: 'active',
        hscBatch: 'HSC 2026',
        group: 'Science',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );

  await mongoose.connection.collection('users').updateOne(
    { email: 'Akash@gmail.com' },
    { $set: { status: 'active' } }
  );

  console.log('Successfully configured student@acube.academy and activated Akash@gmail.com');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
