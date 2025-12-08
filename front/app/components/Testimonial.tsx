// Importing necessary Next.js and React components
'use client'
import Image from 'next/image';
import styles from'../styles/Testimonial.module.css'  // Assuming you've created a corresponding CSS module

function Testimonial() {
    const data = [
        {
            "name": "Dr. Sarah Johnson",
            "job": "Dentist",
            "photo": "https://s3-alpha-sig.figma.com/img/3e7e/1346/9f9936fa68f41c17b224a071bea60ef2?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BwQttRXGNfpjuzvsdQMWqgyl71AdiJJu-hz5foOpRqGzLRLuwBAGKnWgzXoB6miURdtMmWWAWfTldmMe~URELErYAYrR8KAJuTi39TbQ5idRDIZjFgbbR-jDNu5cqf1R0qStHaood2JAJ2dsjKjWuqQqyWhsbkFnyUMbZo9Go5RXrobcCzVQN3KjRoBskJpo-xgQDjHtYkOwk5sgz5hDHFtopsl1Cp4~JAI0PtRNExAffQ4Px1LATpbjhZ~Dxekln0eZI2jmwv~A~kUPemqJnPxcvfwdNSHaPWJKIy3e5JH5fyecw-RXjbPdBxW5pYrQcxw22rARdKcK7ImGlZSfLQ__",
            "review": "Highly skilled and professional"
        },
        {
            "name": "Dr. Michael Thompson",
            "job": "Orthopedic Surgeon",
            "review": "Great bedside manner",
            "photo": "https://s3-alpha-sig.figma.com/img/8fe7/ad6b/85c053224d98bfd7e680608c07f3c239?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VkI4qUvnKkhHHOnFrMvZcEY9Dc31JGRbQ9qQB8AwlKqoC~N2CiuPmMJoGHn3udCqMoF6uUJ5sl5KhMt7IJtegRQ205~Y04Wo3NSDN0CluTH-SkY~6QZW3uCmmNZKfUq~QHYuEEn70PVEaszjm0j0e9JC9wZcfr6AEk7NvAe5Ic7W0F-eEM-tOspzeaqpaX7eSI6EiNQGOix4iN3I~~5x7qm9xxAnnePxKcQphvksf6-0m1uct9TLoDnd-xz7KJihat0VJkCREbRwt5x-l3PgRyMKFLQpA8gNnX08Oc-AXPrj0VtGZkzcQ9d9oM3ulf8cl0dpreh7lgBU9hXwRrl8vA__",
        },
        {
            "name": "Dr. Emily Clark",
            "job": "Ophthalmologist",
            "review": "Excellent care and expertise",
            "photo": "https://s3-alpha-sig.figma.com/img/0577/f0e9/b7fca2f32639871454da0de95f951709?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ip-JNEzAbMNXT55ldcHHzoz3z8Qip6OpJBHn~tysm082frWYXiO6n5tP9jZS~jxUVVKXv8H3~hZ~DzKVYaxGO8QhcdKh7g7EZj3W7bJjM13oitXIH8zsg-nwqJiSrEYlYB3mxGUCORCX1YXfu3UVm9ShQkX0elN6WH5T83eEnDhjA-QsNTUYWF9iDz7iGJj4PptGyIv6bi3GSRAVbgSyPtkl5eFdNlkRKNDrQXrVDK~DoJpAn54OwmE9yy-pxJ3m7xFOjZfmf2G8jb4usrQVmiVdZg5bmVfkTICngxzlH--sj3JRcn8qy49ZvEMjJtnD~lDq6Pt6B66YWvTOvF41hQ__",
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Testimonial</h1>
            <h3 className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.
            </h3>
            <div className={styles.grid}>
                {data.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={item.photo}
                                alt="Doctor's Photo"
                                width={100}
                                height={100}
                                className={styles.roundImage}
                            />
                        </div>
                        <div className={styles.content}>
                            <h2>“{item.review}”</h2>
                            <p>Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.</p>
                            <p><strong>{item.name}</strong></p>
                            <p><strong>{item.job}</strong></p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.trustSection}>
                <h1>Trusted by 10,000+ companies around the world</h1>
                <Image
                    src="https://i.ibb.co/FJqLdXY/Screen-Shot-2024-03-27-at-20-10-15.png"
                    alt="Company Logos"
                    width={1200} // Specify appropriate size
                    height={300} // Specify appropriate size
                    layout='responsive'
                />
            </div>
            <div className={styles.newsletter}>
                <h1>Subscribe to our newsletter</h1>
                <div className={styles.newsletterForm}>
                    <input type="email" placeholder="Enter your email" className={styles.input} />
                    <button className={styles.subscribeButton}>Subscribe</button>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
