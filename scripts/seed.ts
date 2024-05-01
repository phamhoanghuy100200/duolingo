import "dotenv/config"
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";


const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.delete(schema.units);
        await db.delete(schema.lessons); await db.delete(schema.courses);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "American",
                imageSrc: "/usa.png"
            },
            {
                id: 2,
                title: "Chinese",
                imageSrc: "/chinese.png"
            }
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: 'Unit 1',
                description: 'Learn the basics of English',
                order: 1,
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: 'Nouns',
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: 'Verbs',
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: 'Verbs',
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: 'Verbs',
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: 'Verbs',
            },
            {
                id: 6,
                unitId: 1,
                order: 6,
                title: 'Verbs',
            },

        ])
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Đâu là  màu xanh?'
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'màu xanh?'
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Dau la dong ho?'
            },

        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/blue.svg",
                correct: true,
                text: 'blue',
                audioSrc: "/blue.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/shirt.svg",
                correct: false,
                text: 'Shirt',
                audioSrc: "/shirt.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/watch.svg",
                correct: false,
                text: 'Watch',
                audioSrc: "/watch.mp3",
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: true,
                text: 'blue',
                audioSrc: "/blue.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: 'Shirt',
                audioSrc: "/shirt.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: 'Watch',
                audioSrc: "/watch.mp3",
            }
        ])
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/blue.svg",
                correct: false,
                text: 'blue',
                audioSrc: "/blue.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/shirt.svg",
                correct: false,
                text: 'Shirt',
                audioSrc: "/shirt.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/watch.svg",
                correct: true,
                text: 'Watch',
                audioSrc: "/watch.mp3",
            }
        ])

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Đâu là  màu xanh?'
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: 'màu xanh?'
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Dau la dong ho?'
            },

        ]);

        console.log("Seeding finished");


    } catch (error) {
        console.error(error);
        throw new Error('failed to seed the database')
    }
}
main()