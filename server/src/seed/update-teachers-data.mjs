import mongoose from 'mongoose';

async function updateTeachers() {
  await mongoose.connect('mongodb://127.0.0.1:27017/acube-academy');
  
  await mongoose.connection.collection('teachers').updateOne(
    { name: { $regex: 'Akash', $options: 'i' } },
    {
      $set: {
        photo: '/images/teachers/akash-physics.jpg',
        cardImage: '/images/teachers/akash-physics.jpg',
        experience: '4+ years of experience as a Physics teacher',
        punchline: 'Physics নিয়ে no চিন্তা',
        university: 'BRAC University (CSE)',
        designation: 'Physics Instructor'
      }
    }
  );

  await mongoose.connection.collection('teachers').updateOne(
    { name: { $regex: 'Sabbir', $options: 'i' } },
    {
      $set: {
        photo: '/images/teachers/sabbir-math.jpg',
        cardImage: '/images/teachers/sabbir-math.jpg',
        experience: '3.5+ Years of Experience as a Math Teacher',
        punchline: 'এখন Mathematics হবে আরও Easy',
        university: 'BUTEX (TMDM)',
        designation: 'Math Instructor'
      }
    }
  );

  await mongoose.connection.collection('teachers').updateOne(
    { name: { $regex: 'Ahsun', $options: 'i' } },
    {
      $set: {
        photo: '/images/teachers/ahsun-ict.jpg',
        cardImage: '/images/teachers/ahsun-ict.jpg',
        experience: '3+ years of experience as an ICT teacher',
        punchline: 'HTML থেকে Programming, ICT এখন একদম সহজ',
        university: 'IUB (CSE)',
        designation: 'ICT Instructor'
      }
    }
  );

  const updated = await mongoose.connection.collection('teachers').find().toArray();
  console.log('Updated teachers in MongoDB:', updated.map(t => ({ name: t.name, photo: t.photo, punchline: t.punchline })));
  process.exit(0);
}

updateTeachers().catch(err => {
  console.error(err);
  process.exit(1);
});
