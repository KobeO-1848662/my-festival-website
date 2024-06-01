<script>
    import { userProfile } from '/src/routes/scripts/auth.js';
    import { checkFavoriteStatus } from '/src/routes/scripts/favoriteManager.js';

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
    <div class="containerGrid">
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
                        <div class="favorite">
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
    <div class="containerGrid">
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
                        <div class="favorite">
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
    <div class="containerGrid">
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
                        <div class="favorite">
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
</div>
