<script>
    import { userProfile } from '/src/routes/scripts/auth.js';
    import {checkFavoriteStatus, toggleFavorite} from '/src/routes/scripts/favoriteManager.js'
    export let data;
    let isFavorite;
    let profile;
    let audio;
    let isPlaying = false;

    function toggleSong(){
        if (isPlaying) {
            audio.pause()
        } else {
        audio.play();
        }
        isPlaying=!isPlaying
    }

    userProfile.subscribe(async value => {
    profile = value;
    if (profile) {
        profile.favorites = profile.favorites || []; 
        isFavorite = await checkFavoriteStatus(profile.user_id, data.artist.name);
    }
    });

    async function handleToggleFavorite() {
        if (profile) {
            const success = await toggleFavorite(profile, data.artist.name)
            if (success) {
                isFavorite = !isFavorite;
            }
        }
    }
</script>

<div class="photo" style="background-image: url('{data.artist.imagePerf}');">
    <h1>{data.artist.name}</h1>
    {#if profile}
        <button on:click={handleToggleFavorite}>
            {#if isFavorite}
                <i class="fas fa-star"></i> Remove from favorites
            {:else}
                <i class="far fa-star"></i> Add to favorites
            {/if}
        </button>
    {/if}
</div>
<div class="containerFlex">
    <div class="item">
        <h4>{data.artist.about}</h4>
        <audio bind:this={audio} src={data.artist.audio}></audio>
        <button class="play-button" on:click={toggleSong}>
            {#if isPlaying}
                <i class="far fa-circle-pause"></i>
            {:else}
                <i class="far fa-circle-play"></i>
            {/if}
        </button>
    </div>
    <div class="item">
        <h2>Genre</h2>
        <h4>{data.artist.genre}</h4>
    </div>
    <div class="item">
        <h2>Time and stage</h2>
        <h4>{data.artist.day} {data.artist.time} - {data.artist.stage}</h4>
    </div>
</div>