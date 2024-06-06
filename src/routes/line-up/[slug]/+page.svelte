<script>
    import { userProfile } from '/src/routes/scripts/auth.js';
    import {checkFavoriteStatus, toggleFavorite} from '/src/routes/scripts/favoriteManager.js'
    import { onMount } from "svelte";
    
    export let data;
    let isFavorite;
    let profile;
    let audio;
    let isPlaying = false;
    let duration = 0;
    let currentTime = 0;

    function toggleSong(){
        if (isPlaying) {
            audio.pause()
        } else {
        audio.play();
        }
        isPlaying=!isPlaying
    }

    function handleTimeUpdate() {
        currentTime = audio.currentTime;
    }

    function handleLoadedMetadata() {
        duration = audio.duration;
    }

    function handleSeek(event) {
        audio.currentTime = event.target.value;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    userProfile.subscribe(async value => {
    profile = value;
    if (profile) {
        profile.favorites = profile.favorites || []; 
        isFavorite = await checkFavoriteStatus(profile.user_id, data.artist.name);
    }
    });

    function handleKeydown(event) {
        const seekAmount = 5; 
        if (event.key === 'ArrowLeft') {
            currentTime = Math.max(0, currentTime - seekAmount);
        } else if (event.key === 'ArrowRight') {
            currentTime = Math.min(duration, currentTime + seekAmount);
        }
        audio.currentTime = currentTime;
        if (event.key === 'space') {
            toggleSong();
        }
    }

    async function handleToggleFavorite() {
        if (profile) {
            const success = await toggleFavorite(profile, data.artist.name)
            if (success) {
                isFavorite = !isFavorite;
            }
        }
    };

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<div class="photo" style="background-image: url('{data.artist.imagePerf}');" id="{data.artist.id}">
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
        <audio bind:this={audio} src={data.artist.audio} on:timeupdate={handleTimeUpdate} on:loadedmetadata={handleLoadedMetadata}></audio>
        <button class="play-button" on:click={toggleSong}>
            {#if isPlaying}
                <i class="far fa-circle-pause"></i>
            {:else}
                <i class="far fa-circle-play"></i>
            {/if}
        </button>
        <input type="range" min="0" max="{duration}" value="{currentTime}" on:input={handleSeek} />
        <span>{formatTime(currentTime)}/{formatTime(duration)}</span>
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

<!-- svelte-ignore a11y-invalid-attribute -->
<p><a href="javascript:history.back()">Go back</a></p>