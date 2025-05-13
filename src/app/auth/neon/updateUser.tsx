"use server"
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function updateUserProfile(ActualName : any, username : String, bio : String, location : String, website : String, x : String, instagram: string, twitch: string, favoriteCommunity: string) {

    if (username) {
        try {
            await sql('UPDATE users SET name = $1 WHERE name = $2 ', [username, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (bio) {
        try {
            await sql('UPDATE users_ai SET bio = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [bio, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (location) {
        try {
            await sql('UPDATE users_ai SET location = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [location, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (website) {
        try {
            await sql('UPDATE users_ai SET website = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [website, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (x) {
        try {
            await sql('UPDATE users_ai SET x = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [x, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (instagram) {
        try {
            await sql('UPDATE users_ai SET instagram = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [instagram, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (twitch) {
        try {
            await sql('UPDATE users_ai SET twitch = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [twitch, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }
    if (favoriteCommunity) {
        try {
            await sql('UPDATE users_ai SET favoriteCommunity = $1 FROM users WHERE users_ai.user_id = users.id AND users.name = $2', [favoriteCommunity, ActualName]);
        } catch (error) {
            console.log(error)
        }
    }

}