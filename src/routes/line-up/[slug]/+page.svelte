<script>
    export let data;

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
</script>

<div class="photo" style="background-image: url('{data.artist.imagePerf}');">
    <h1>{data.artist.name}</h1>
</div>
<div class="containerFlex">
    <div class="item">
        <h4>{data.artist.about}</h4>
        <audio bind:this={audio} src={data.artist.audio}></audio>
        <button class="play-button" on:click={toggleSong}>
            {#if isPlaying}
                <div class="pause-icon">
                    <div></div>
                    <div></div>
                </div>
            {:else}
                <div class="play-icon"></div>
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