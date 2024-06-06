<script>
    import { userProfile } from '/src/routes/scripts/auth.js';
    import { checkFavoriteStatus, toggleFavorite } from '/src/routes/scripts/favoriteManager.js';

    export let data;

    let selectedDay = 'All';
    let showOnlyFavorites = false;
    let profile;
    let favoriteStatuses = {};

    function selectDay(day) {
        selectedDay = day;
    }

    function toggleShowFavorites(){
        showOnlyFavorites = !showOnlyFavorites;
    }

    userProfile.subscribe(async value => {
        profile = value;
        if (profile) {
            for (let artist of data.artists) {
                favoriteStatuses[artist.name] = await checkFavoriteStatus(profile.user_id, artist.name);
            }
        }
    });

    async function handleToggleFavorite(event, artist) {
        event.stopPropagation();
        event.preventDefault();
        if (profile) {
            const success = await toggleFavorite(profile, artist.name)
            if (success) {
                favoriteStatuses[artist.name] = !favoriteStatuses[artist.name];
            }
        }
    };
</script>


<h1>Line Up</h1>
<div class="containerDays">
    <div class="days">
        <button type="button" class="day {selectedDay === 'Saturday' ? 'selected' : ''}" on:click={() => selectDay('Saturday')}>Saturday</button>
        <button type="button" class="day {selectedDay === 'Sunday' ? 'selected' : ''}" on:click={() => selectDay('Sunday')}>Sunday</button>
        <button type="button" class="day {selectedDay === 'All' ? 'selected' : ''}" on:click={() => selectDay('All')}>All</button>
    </div>
</div>
{#if profile}
<div class="favorite-toggle">
    <button on:click={toggleShowFavorites}>
        {#if showOnlyFavorites}
            Show All Artists
        {:else}
            Show Only Favorites
        {/if}
    </button>
</div>
{/if}
<div class="containerFlex">
    <h2>Main Stage</h2>
    <div class="containerArtists">
        {#each data.artists as artist}
            {#if 
                (!showOnlyFavorites || (profile && favoriteStatuses[artist.name])) &&
                (selectedDay === 'All' && artist.stage === 'Main Stage' || 
                selectedDay === 'Saturday' && artist.day === 'Sat'  && artist.stage === 'Main Stage' ||  
                selectedDay === 'Sunday' && artist.day === 'Sun' && artist.stage === 'Main Stage')
            }
            <a href="/line-up/{artist.name}">
                <div class="item">
                    {#if profile}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="favorite" on:click={(event) => handleToggleFavorite(event, artist)}>
                            {#if favoriteStatuses[artist.name]}
                                <i class="fas fa-star"></i>
                            {:else}
                                <i class="far fa-star"></i>
                            {/if}
                        </div>
                    {/if}
                    <div class="name">{artist.name}</div>
                    <div class="imageContainer">
                        <img src={artist.image} alt={artist.name} />
                    </div>
                    <div class="genre">{artist.genre}</div>
                </div>
            </a>
            {/if}
        {/each}
    </div>
    <h2>Boiler Room</h2>
    <div class="containerArtists">
        {#each data.artists as artist}
            {#if 
                (!showOnlyFavorites || (profile && favoriteStatuses[artist.name])) &&
                (selectedDay === 'All' && artist.stage === 'Boiler Room' || 
                selectedDay === 'Saturday' && artist.day === 'Sat'  && artist.stage === 'Boiler Room' ||  
                selectedDay === 'Sunday' && artist.day === 'Sun' && artist.stage === 'Boiler Room')
            }               
            <a href="/line-up/{artist.name}">
                <div class="item">
                    {#if profile}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="favorite" on:click={(event) => handleToggleFavorite(event, artist)}>
                            {#if favoriteStatuses[artist.name]}
                                <i class="fas fa-star"></i>
                            {:else}
                                <i class="far fa-star"></i>
                            {/if}
                        </div>
                    {/if}
                    <div class="name">{artist.name}</div>
                    <div class="imageContainer">
                        <img src={artist.image} alt={artist.name} />
                    </div>
                    <div class="genre">{artist.genre}</div>
                </div>
            </a>
            {/if}
        {/each}
    </div>
    <h2>Dance Hall</h2>
    <div class="containerArtists">
        {#each data.artists as artist}
            {#if 
                (!showOnlyFavorites || (profile && favoriteStatuses[artist.name])) &&
                (selectedDay === 'All' && artist.stage === 'Dance Hall' || 
                selectedDay === 'Saturday' && artist.day === 'Sat'  && artist.stage === 'Dance Hall' ||  
                selectedDay === 'Sunday' && artist.day === 'Sun' && artist.stage === 'Dance Hall')
            }               
            <a href="/line-up/{artist.name}">
                <div class="item">
                    {#if profile}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="favorite" on:click={(event) => handleToggleFavorite(event, artist)}>
                            {#if favoriteStatuses[artist.name]}
                                <i class="fas fa-star"></i>
                            {:else}
                                <i class="far fa-star"></i>
                            {/if}
                        </div>
                    {/if}
                    <div class="name">{artist.name}</div>
                    <div class="imageContainer">
                        <img src={artist.image} alt={artist.name} />
                    </div>
                    <div class="genre">{artist.genre}</div>
                </div>
            </a>
            {/if}
        {/each}
    </div>
    <h2>Full schedule</h2>
    <div class="containerSchedule">
        <div class="dayColumn">
            <h3>Saturday</h3>
            {#each Array.from({ length: 13 }, (_, i) => i + 12) as hour}
                <div class="scheduleHour">
                    <div class="hourLabel">{hour}:00</div>
                    <div class="artistsInHour">
                        {#each data.artists as artist}
                            {#if artist.day === 'Sat' && artist.time === hour + ':00:00'}
                                <div class="artistSlot">{artist.name}</div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        <div class="dayColumn">
            <h3>Sunday</h3>
            {#each Array.from({ length: 13 }, (_, i) => i +12) as hour}
                <div class="scheduleHour">
                    <div class="hourLabel">{hour}:00</div>
                    <div class="artistsInHour">
                        {#each data.artists as artist}
                            {#if artist.day === 'Sun' && artist.time === hour + ':00:00'}
                                <div class="artistSlot">{artist.name}</div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
