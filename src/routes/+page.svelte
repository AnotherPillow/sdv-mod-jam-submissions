<script lang="ts">
    import { toast } from "svoast";

    const endUnix = 1698551940*1000
    const endStamp = (new Date(endUnix)).toLocaleString()

    const isOver = (new Date() as unknown as number) > endUnix

    /** @type {import('./$types').ActionData} */
	export let form: any;

    if (form?.success) {
        toast.success('Successfully submitted mod!')
    } else if (form?.success === false) {
        toast.error('An error occured while submitting the mod.')
    }
    
    const handleInvalidInput = async (event: any) => {
        toast.error(`Invalid value for the ${event.target.getAttribute('data-human-name')}.`)
    }

</script>

<h1>Stardew Valley Mod Jam Submissions</h1>

{#if isOver}
    <h2>This mod jam ended at {endStamp}, watch out for any possible future ones!</h2>
{:else}
    <h3>Ends at {endStamp}</h3>

    <form method="POST" enctype="multipart/form-data" >
        <div class="row">
            <label for="usernameInput">Discord Username(s): </label>
            <input 
                on:invalid={handleInvalidInput}
                type="text" 
                id="usernameInput"
                name="usernameInput"
                placeholder="mycooldiscordname"
                data-human-name="discord username field"
                required
            />
        </div>

        <br />

        <div class="row">
            <label for="categorySelect">Category: </label>
            <select name="categorySelect" id="categorySelect">
                <option value="signatureRoundOption">Signature: one author, content pack mod</option>
                <option value="technicalRoundOption">Technical: one author, based on template "recipe"</option>
                <option value="showstopperRoundOption">Showstopper: 1+ authors, C# or content pack</option>
            </select>
        </div>
        
        <br />
        
        <div class="row">
            <label for="categoryInput">Any Notes?: </label>
            <input 
                on:invalid={handleInvalidInput}
                type="text" 
                id="categoryInput"
                name="categoryInput"
                placeholder="Requires x, y, z, ..."
                data-human-name="note input field"
            />
        </div>
        
        <br />

        <div class="row">
            <label for="fileInput">Mod File (<a href="https://catbox.moe/" target="_blank">catbox.moe link</a>): </label>
            <input 
                on:invalid={handleInvalidInput}
                type="text" 
                id="fileInput"
                name="fileInput"
                data-human-name="catbox.moe link field"
                placeholder="https://catbox.moe/asdfgh.zip"
                pattern="https:\/\/files\.catbox\.moe\/[A-Za-z0-9]+\.zip"
                required
            />
        </div>
        
        <br />

        <div class="row">
            <button type="submit">Submit Mod</button>
        </div>

        

    </form>
{/if}

<style lang="scss">
    input, select, button {
        background-color: #222222;
        border-radius: 0.5em;
        color: white;

        outline: none;
        border: 2px solid black;
    }

    button {
        padding: 1em;
    }

    .row {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    a {
        color: rgb(167, 86, 164);
    }
</style>