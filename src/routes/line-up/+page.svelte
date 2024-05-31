<script>
    export let data;

    let selectedDay = 'All';
    
    function selectDay(day) {
        selectedDay = day;
    }
</script>


<h1>Line Up</h1>
<div class="containerDays">
    <div class="days">
        <button type="button" class="day {selectedDay === 'Saturday' ? 'selected' : ''}" on:click={() => selectDay('Saturday')}>Saturday</button>
        <button type="button" class="day {selectedDay === 'Sunday' ? 'selected' : ''}" on:click={() => selectDay('Sunday')}>Sunday</button>
        <button type="button" class="day {selectedDay === 'All' ? 'selected' : ''}" on:click={() => selectDay('All')}>All</button>
    </div>
</div>
<div class="containerFlex">
    <h2>Main Stage</h2>
    <div class="containerGrid">
        {#each data.artists as artist}
            {#if selectedDay === 'All' && artist.stage === 'Main Stage' || selectedDay === 'Saturday' && artist.day === 'Sat'  && artist.stage === 'Main Stage' ||  selectedDay === 'Sunday' && artist.day === 'Sun' && artist.stage === 'Main Stage'}
                <a href="/line-up/{artist.name}">
                <div class="item">
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
            {#if selectedDay === 'All' && artist.stage === 'Boiler Room' || selectedDay === 'Saturday' && artist.day === 'Sat'  && artist.stage === 'Boiler Room' ||  selectedDay === 'Sunday' && artist.day === 'Sun' && artist.stage === 'Boiler Room'}
                <a href="/line-up/{artist.name}">
                <div class="item">
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
            {#if selectedDay === 'All' && artist.stage === 'Dance Hall' || selectedDay === 'Saturday' && artist.day === 'Sat'  && artist.stage === 'Dance Hall' ||  selectedDay === 'Sunday' && artist.day === 'Sun' && artist.stage === 'Dance Hall'}
                <a href="/line-up/{artist.name}">
                <div class="item">
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
