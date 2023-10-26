import {
    SIGNATURE_WEBHOOK,
    TECHNICAL_WEBHOOK,
    SHOWSTOPPER_WEBHOOK
} from "$env/static/private"

import NodeFormData from 'form-data'
import { Buffer } from 'buffer';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const { fetch } = event;
        const host = event.request.headers.get('host')
        
        const data = await event.request.formData()

        const name = (data.get('usernameInput')?.toString() ?? 'Unknown user!')
            .replace(/@/g, '')
            .replace(/everyone/g, 'every***')
            .replace(/here/g, 'h***')
        const category = data.get('categorySelect')
        const notes = data.has('categoryInput') ? data.get('categoryInput') : 'No notes specified.'
        const file = (data.get('fileInput') ?? '').toString();

        const catboxRegex = /^https\:\/\/files\.catbox\.moe\/[A-Za-z0-9]+\.zip$/

        if (!catboxRegex.test(file)) return { success: false }

        console.log(
            name,
            category,
            notes,
            file
        )


        let hook = ''
        let categoryPretty = ''
        switch (category) {
            case 'signatureRoundOption':
                hook = SIGNATURE_WEBHOOK;
                categoryPretty = 'Signature'
                break;
            case 'technicalRoundOption':
                hook = TECHNICAL_WEBHOOK;
                categoryPretty = 'Technical'
                break;
            case 'showstopperRoundOption':
                hook = SHOWSTOPPER_WEBHOOK;
                categoryPretty = 'Showstopper'
                break;
            default:
                hook = TECHNICAL_WEBHOOK
                categoryPretty = 'Unknown'
                break;
        }

        console.log(hook, categoryPretty)

        const avatar = host?.includes('localhost') ? 'https://i.imgur.com/EXm6MnT.png' : ('https://' + host + '/favicon.png')

        const embeds = [
            {
                title: `New ${categoryPretty} Submission!`,
                fields: [
                    {
                        name: '**Author(s)**',
                        value: name,
                        inline: true,
                    },
                    {
                        name: '**Notes**',
                        value: notes,
                        inline: true,
                    },
                    {
                        name: '**Category**',
                        value: categoryPretty,
                        inline: true,
                    },
                    {
                        name: '**Mod File**',
                        value: `[catbox link](${file})`,
                        inline: true,
                    },
                ],
                thumbnail: {
                    url: avatar,
                },
                footer: {
                    "text": `Submitted at ${(new Date()).getTime().toLocaleString()} UTC. Running on stardew.rocks`,
                    "icon_url": "https://avatars.githubusercontent.com/u/143358767"
                }
            },
        ];

        const payload = {
            content: `@${name.split('\n')[0].trim()}'s ${categoryPretty} Mod!`,
            embeds: embeds,
            username: `New ${categoryPretty} Mod`,
            avatar_url: avatar,
        };

        let submissionRes = await fetch(hook, {
            'method':'POST',
            'body': JSON.stringify(payload),
            'headers': {
                'Content-Type': 'application/json',
            }
        })

        const _success = [200, 204].includes(submissionRes.status)



        return {
            success: _success,
        }
	}
};