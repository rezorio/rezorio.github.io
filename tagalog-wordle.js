// Tagalog Wordle Game Logic
class TagalogWordle {
    constructor() {
        this.words = [
            'AALIS', 'AAMIN', 'AARAW', 'ABALA', 'ABANG', 'ABBOT', 'ABISO', 'ABONG', 'ABONO', 'ABRIR',
            'ABUSO', 'ACIDO', 'ADIOS', 'AGAMA', 'AGAPO', 'AGHAM', 'AGILA', 'AGNAS', 'AGONG', 'AGUAS',
            'AHENTE', 'AKLAT', 'AKLAS', 'AKMOL', 'ALAGA', 'ALALA', 'ALANG', 'ALAWS', 'ALBAY', 'ALILA',
            'ALINS', 'ALMAS', 'ALMON', 'ALONA', 'ALOOF', 'ALPHA', 'ALTAR', 'ALYAS', 'AMANG', 'AMBOY',
            'AMIGA', 'AMIGO', 'AMINA', 'AMOKS', 'AMONG', 'AMPON', 'ANANG', 'ANGAS', 'ANGAW', 'ANGIL',
            'ANGKA', 'ANGKO', 'ANGOT', 'ANINO', 'ANITO', 'ANONG', 'ANSAY', 'ANTAY', 'ANTES', 'ANTOK',
            'ANTOS', 'ANUPA', 'ANYAG', 'ANYOS', 'APANG', 'APELA', 'APIDS', 'APILA', 'APILO', 'APONG',
            'APORO', 'APOYA', 'APTAS', 'APUHA', 'APULA', 'APUNO', 'APUYA', 'ARABO', 'ARARO', 'ARMAS',
            'ARNOL', 'ARONG', 'ARTES', 'ASAWA', 'ASERO', 'ASIDO', 'ASILO', 'ASKAR', 'ASONG', 'ASTIG',
            'ASTOS', 'ASUKA', 'ASUNO', 'ATANG', 'ATAYA', 'ATENG', 'ATING', 'ATLAS', 'ATMOS', 'ATONG',
            'ATSAY', 'ATUBA', 'AWANG', 'AWASA', 'AWING', 'AWITS', 'AWOLS', 'AWRAY', 'AYAAN', 'AYALA',
            'AYAMS', 'AYANO', 'AYAWS', 'AYOKO', 'AYONS', 'AYUDA', 'AZADA', 'AZOTE', 'AZUAY', 'AZUCE',
            'BABOY', 'BABUY', 'BACAW', 'BACHA', 'BADIL', 'BAGAY', 'BAGOL', 'BAGOS', 'BAGOT', 'BAGYO',
            'BAHAG', 'BAHAW', 'BAHAY', 'BAHIN', 'BAHOG', 'BAKAS', 'BAKAW', 'BAKLA', 'BAKOD', 'BAKOL',
            'BAKOS', 'BAKOT', 'BAKYA', 'BALAE', 'BALAK', 'BALAN', 'BALAS', 'BALAT', 'BALAW', 'BALDA',
            'BALDY', 'BALES', 'BALIK', 'BALON', 'BALOS', 'BALOT', 'BALSA', 'BALTI', 'BALUT', 'BAMBO',
            'BANAK', 'BANAL', 'BANAS', 'BANAT', 'BANAY', 'BANDA', 'BANDI', 'BANGA', 'BANIG', 'BANKO',
            'BANOY', 'BANSA', 'BANTO', 'BANWA', 'BAPOR', 'BARAS', 'BARAT', 'BARAW', 'BARBA', 'BARKO',
            'BARON', 'BAROT', 'BARUS', 'BARYО', 'BASAG', 'BASAH', 'BASAN', 'BASAR', 'BASAS', 'BASAW',
            'BASCO', 'BASHA', 'BASIG', 'BASIN', 'BASKA', 'BASON', 'BASTA', 'BASTO', 'BASUG', 'BASUK',
            'BASYO', 'BATAD', 'BATAK', 'BATAN', 'BATAS', 'BATAW', 'BATCH', 'BATES', 'BATIK', 'BATIN',
            'BATOK', 'BATON', 'BATOS', 'BATSA', 'BATTA', 'BATYA', 'BAUDS', 'BAUGA', 'BAULS', 'BAWAL',
            'BAWAN', 'BAWAS', 'BAWAT', 'BAWAY', 'BAWIS', 'BAWIT', 'BAWOL', 'BAYAD', 'BAYAG', 'BAYAK',
            'BAYAN', 'BAYAS', 'BAYAW', 'BAYOG', 'BAYOK', 'BAYON', 'BAYOT', 'BAYOY', 'BAYSA', 'BAYTO',
            'BEADS', 'BEAMS', 'BEANS', 'BEARS', 'BEAST', 'BEATS', 'BEBEL', 'BECKY', 'BEDEL', 'BEEFS',
            'BEERS', 'BEETS', 'BEGAN', 'BEGAY', 'BEIGE', 'BEING', 'BELAT', 'BELEN', 'BELLS', 'BELLY',
            'BELOW', 'BELTS', 'BENCH', 'BENDS', 'BENTA', 'BERDE', 'BERGS', 'BERRY', 'BESES', 'BESTA',
            'BESTO', 'BETAS', 'BETIS', 'BETON', 'BETTA', 'BETTY', 'BEVES', 'BEWAS', 'BIABA', 'BIADS',
            'BIAGA', 'BIAHO', 'BIAKA', 'BIALA', 'BIAMO', 'BIANA', 'BIANG', 'BIASA', 'BIATO', 'BIBIG',
            'BIBIS', 'BICOL', 'BIDDA', 'BIDET', 'BIGAS', 'BIGAT', 'BIGAY', 'BIGLA', 'BIGTI', 'BIHIN',
            'BIHOS', 'BIIKS', 'BIING', 'BIJAO', 'BIKAL', 'BIKAS', 'BIKAT', 'BIKOL', 'BILAG', 'BILAK',
            'BILAN', 'BILAS', 'BILAT', 'BILAW', 'BILDO', 'BILES', 'BILGA', 'BILIG', 'BILIN', 'BILIS',
            'BILMO', 'BILOG', 'BILON', 'BILOS', 'BILOT', 'BILOY', 'BILSA', 'BILTI', 'BILYA', 'BIMBO',
            'BINAG', 'BINAK', 'BINAL', 'BINAN', 'BINAS', 'BINAT', 'BINAW', 'BINAY', 'BINDI', 'BINGI',
            'BINGO', 'BINHI', 'BINIG', 'BINIK', 'BINIT', 'BINOY', 'BINTA', 'BINTI', 'BINUT', 'BIONG',
            'BIPAD', 'BIPOD', 'BIRAK', 'BIRAS', 'BIRAT', 'BIRAY', 'BIRDS', 'BIRIK', 'BIRIS', 'BIROG',
            'BIRON', 'BIROT', 'BIRSA', 'BIRTH', 'BISAG', 'BISAN', 'BISAY', 'BISES', 'BISIG', 'BISIN',
            'BISOL', 'BISON', 'BISOY', 'BISTA', 'BISTO', 'BISYO', 'BITAG', 'BITAK', 'BITAL', 'BITAN',
            'BITAS', 'BITAW', 'BITAY', 'BITES', 'BITIK', 'BITIN', 'BITIS', 'BITOG', 'BITON', 'BITOS',
            'BITOY', 'BITSA', 'BITSO', 'BITTA', 'BITTS', 'BITTY', 'BITUK', 'BITUS', 'BIWAY', 'BIYAG',
            'BIYAK', 'BIYAN', 'BIYAS', 'BIYAW', 'BIYAY', 'BIYOG', 'BIYOK', 'BIYON', 'BIYOS', 'BIYOT',
            'BIZCO', 'BLABS', 'BLACK', 'BLADE', 'BLADS', 'BLAGS', 'BLAH', 'BLAMS', 'BLANK', 'BLARE',
            'BLAST', 'BLATS', 'BLAZE', 'BLEAK', 'BLEAT', 'BLEDS', 'BLEED', 'BLEEP', 'BLEND', 'BLESS',
            'BLETS', 'BLIMP', 'BLIND', 'BLINK', 'BLIPS', 'BLISS', 'BLITZ', 'BLOAT', 'BLOBS', 'BLOCK',
            'BLOCS', 'BLOGS', 'BLOKE', 'BLOND', 'BLOOD', 'BLOOM', 'BLOTS', 'BLOWN', 'BLOWS', 'BLUES',
            'BLUFF', 'BLUNT', 'BLURB', 'BLURS', 'BLURT', 'BLUSH', 'BOARS', 'BOAST', 'BOATS', 'BOBBY',
            'BOCKS', 'BODED', 'BODES', 'BOGEY', 'BOGUS', 'BOILS', 'BOING', 'BOLAS', 'BOLDS', 'BOLTS',
            'BOMBS', 'BONDS', 'BONED', 'BONES', 'BONGS', 'BONKS', 'BONUS', 'BOOBS', 'BOOED', 'BOOKS',
            'BOOMS', 'BOOST', 'BOOTH', 'BOOTS', 'BOOZE', 'BOOZY', 'BORED', 'BORER', 'BORES', 'BORNS',
            'BOSOM', 'BOSSY', 'BOTCH', 'BOUGH', 'BOUND', 'BOUTS', 'BOWED', 'BOWEL', 'BOWER', 'BOWLS',
            'BOXED', 'BOXER', 'BOXES', 'BOYAR', 'BOYAS', 'BOYOS', 'BRACE', 'BRADS', 'BRAGS', 'BRAID',
            'BRAIN', 'BRAKE', 'BRAND', 'BRASH', 'BRASS', 'BRATS', 'BRAVE', 'BRAVO', 'BRAWS', 'BRAYS',
            'BREAD', 'BREAK', 'BREED', 'BREWS', 'BRIAR', 'BRIBE', 'BRICK', 'BRIDE', 'BRIEF', 'BRIGS',
            'BRIMS', 'BRINE', 'BRING', 'BRINK', 'BRINY', 'BRISK', 'BROAD', 'BROIL', 'BROKE', 'BROOD',
            'BROOK', 'BROOM', 'BROTH', 'BROWN', 'BROWS', 'BRUNT', 'BRUSH', 'BRUTE', 'BUANG', 'BUAYA',
            'BUBOY', 'BUCAL', 'BUCAS', 'BUCHA', 'BUCHO', 'BUCIN', 'BUCKO', 'BUCKS', 'BUDHI', 'BUDOL',
            'BUDOY', 'BUENA', 'BUENO', 'BUFET', 'BUGAL', 'BUGAN', 'BUGAS', 'BUGAT', 'BUGAW', 'BUGHA',
            'BUGOK', 'BUGOY', 'BUGSO', 'BUGTI', 'BUHAG', 'BUHAI', 'BUHAK', 'BUHAL', 'BUHAT', 'BUHAY',
            'BUHOL', 'BUHON', 'BUHOS', 'BUHOT', 'BUIDS', 'BUIGA', 'BUIGS', 'BUIKS', 'BUILS', 'BUINS',
            'BUIRA', 'BUIRS', 'BUISO', 'BUIST', 'BUITA', 'BUITO', 'BUKAL', 'BUKAS', 'BUKAT', 'BUKAW',
            'BUKAY', 'BUKID', 'BUKIG', 'BUKIN', 'BUKIS', 'BUKLA', 'BUKOD', 'BUKOL', 'BUKON', 'BUKOS',
            'BUKOT', 'BUKOY', 'BUKSA', 'BUKTO', 'BULAD', 'BULAG', 'BULAN', 'BULAS', 'BULAT', 'BULAW',
            'BULBO', 'BULBS', 'BULGE', 'BULKS', 'BULKY', 'BULLS', 'BULLY', 'BULOK', 'BULON', 'BULOS',
            'BULOY', 'BULSA', 'BULTO', 'BUMAG', 'BUMAL', 'BUMAN', 'BUMAS', 'BUMAT', 'BUMAY', 'BUMBO',
            'BUMPS', 'BUMPY', 'BUNAL', 'BUNAN', 'BUNAS', 'BUNAT', 'BUNAW', 'BUNAY', 'BUNCH', 'BUNCO',
            'BUNDA', 'BUNDY', 'BUNGA', 'BUNGI', 'BUNGO', 'BUNGS', 'BUNKS', 'BUNNY', 'BUNOD', 'BUNOK',
            'BUNOL', 'BUNOS', 'BUNOT', 'BUNOY', 'BUNSO', 'BUNTO', 'BUNTS', 'BUNTY', 'BUNUT', 'BUONG',
            'BUPAL', 'BUPAS', 'BUPAT', 'BUPAY', 'BUPIT', 'BURAK', 'BURAN', 'BURAS', 'BURAT', 'BURAW',
            'BURAY', 'BURDA', 'BUREK', 'BURET', 'BURGA', 'BURGS', 'BURIK', 'BURIN', 'BURIS', 'BURKA',
            'BURKS', 'BURLS', 'BURLY', 'BURNS', 'BURNT', 'BURPS', 'BURQA', 'BURRO', 'BURRS', 'BURRY',
            'BURST', 'BURTI', 'BURUG', 'BURUL', 'BURUN', 'BURUS', 'BURUT', 'BUSAG', 'BUSAN', 'BUSAO',
            'BUSAY', 'BUSCH', 'BUSED', 'BUSES', 'BUSHY', 'BUSIG', 'BUSIN', 'BUSIS', 'BUSIT', 'BUSOG',
            'BUSON', 'BUSOS', 'BUSOT', 'BUSOY', 'BUSSA', 'BUSSO', 'BUSTS', 'BUSTY', 'BUSUK', 'BUSUL',
            'BUSUT', 'BUTAD', 'BUTAK', 'BUTAN', 'BUTAS', 'BUTAW', 'BUTAY', 'BUTCH', 'BUTED', 'BUTES',
            'BUTID', 'BUTIG', 'BUTIN', 'BUTIS', 'BUTIT', 'BUTKA', 'BUTOD', 'BUTOG', 'BUTOK', 'BUTON',
            'BUTOS', 'BUTOT', 'BUTOY', 'BUTSA', 'BUTSO', 'BUTTS', 'BUTTY', 'BUTUD', 'BUTUG', 'BUTUK',
            'BUTUL', 'BUTUN', 'BUTUL', 'BUTUS', 'BUTUT', 'BUWAY', 'BUWAD', 'BUWAG', 'BUWAK', 'BUWAL',
            'BUWAN', 'BUWAS', 'BUWAT', 'BUWAW', 'BUWIS', 'BUWIT', 'BUWOL', 'BUWON', 'BUWOS', 'BUWOT',
            'BUWOY', 'BUYAG', 'BUYAK', 'BUYAN', 'BUYAS', 'BUYAT', 'BUYAW', 'BUYAY', 'BUYER', 'BUYID',
            'BUYIG', 'BUYIN', 'BUYIS', 'BUYIT', 'BUYOG', 'BUYOK', 'BUYON', 'BUYOS', 'BUYOT', 'BUYOY',
            'BUYSA', 'BUYSO', 'BUYUD', 'BUYUG', 'BUYUK', 'BUYUL', 'BUYUN', 'BUYUP', 'BUYUS', 'BUYUT'
        ];
        
        this.currentWord = '';
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.guesses = [];
        
        this.init();
    }

    init() {
        this.setDailyWord();
        this.createGrid();
        this.createKeyboard();
        this.loadGameState();
        this.bindEvents();
    }

    setDailyWord() {
        const today = new Date();
        const start = new Date('2024-01-01');
        const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        const wordIndex = daysSinceStart % this.words.length;
        this.currentWord = this.words[wordIndex];
    }

    createGrid() {
        const grid = document.getElementById('gameGrid');
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'grid-row';
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.id = `cell-${i}-${j}`;
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    createKeyboard() {
        const keyboard = document.getElementById('keyboard');
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
        ];

        rows.forEach(row => {
            const keyRow = document.createElement('div');
            keyRow.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = 'key';
                keyElement.textContent = key;
                keyElement.id = `key-${key}`;
                
                if (key === 'ENTER' || key === 'DELETE') {
                    keyElement.classList.add('wide');
                }
                
                keyElement.addEventListener('click', () => this.handleKeyPress(key));
                keyRow.appendChild(keyElement);
            });
            
            keyboard.appendChild(keyRow);
        });
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            if (key === 'ENTER') {
                this.handleKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                this.handleKeyPress('DELETE');
            } else if (key.match(/[A-Z]/)) {
                this.handleKeyPress(key);
            }
        });
    }

    handleKeyPress(key) {
        if (this.gameOver) return;

        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'DELETE') {
            this.deleteLetter();
        } else if (this.currentCol < 5) {
            this.addLetter(key);
        }
    }

    addLetter(letter) {
        const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
        cell.textContent = letter;
        cell.classList.add('filled');
        this.currentCol++;
    }

    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
            cell.textContent = '';
            cell.classList.remove('filled');
        }
    }

    submitGuess() {
        if (this.currentCol !== 5) {
            this.showMessage('Kailangan ng 5 letra!', 'error');
            return;
        }

        const guess = this.getCurrentGuess();
        
        if (!this.isValidWord(guess)) {
            this.showMessage('Hindi kilalang salita!', 'error');
            return;
        }

        this.guesses.push(guess);
        this.checkGuess(guess);
        this.updateKeyboard(guess);
        
        if (guess === this.currentWord) {
            this.gameWon = true;
            this.gameOver = true;
            this.showMessage('Tama! Nakuha mo!', 'success');
            setTimeout(() => this.showStats(), 2000);
        } else if (this.currentRow === 5) {
            this.gameOver = true;
            this.showMessage(`Talo! Ang sagot ay: ${this.currentWord}`, 'error');
            setTimeout(() => this.showStats(), 2000);
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
        
        this.saveGameState();
    }

    getCurrentGuess() {
        let guess = '';
        for (let i = 0; i < 5; i++) {
            const cell = document.getElementById(`cell-${this.currentRow}-${i}`);
            guess += cell.textContent;
        }
        return guess;
    }

    isValidWord(word) {
        return this.words.includes(word);
    }

    checkGuess(guess) {
        const wordArray = this.currentWord.split('');
        const guessArray = guess.split('');
        const result = new Array(5).fill('absent');
        
        // Check for correct letters
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === wordArray[i]) {
                result[i] = 'correct';
                wordArray[i] = null;
            }
        }
        
        // Check for present letters
        for (let i = 0; i < 5; i++) {
            if (result[i] === 'absent' && wordArray.includes(guessArray[i])) {
                result[i] = 'present';
                wordArray[wordArray.indexOf(guessArray[i])] = null;
            }
        }
        
        // Apply colors to cells
        for (let i = 0; i < 5; i++) {
            const cell = document.getElementById(`cell-${this.currentRow}-${i}`);
            setTimeout(() => {
                cell.classList.add(result[i]);
            }, i * 100);
        }
    }

    updateKeyboard(guess) {
        const wordArray = this.currentWord.split('');
        const guessArray = guess.split('');
        
        for (let i = 0; i < 5; i++) {
            const key = document.getElementById(`key-${guessArray[i]}`);
            if (!key) continue;
            
            if (guessArray[i] === wordArray[i]) {
                key.classList.remove('present', 'absent');
                key.classList.add('correct');
            } else if (wordArray.includes(guessArray[i]) && !key.classList.contains('correct')) {
                key.classList.remove('absent');
                key.classList.add('present');
            } else if (!key.classList.contains('correct') && !key.classList.contains('present')) {
                key.classList.add('absent');
            }
        }
    }

    showMessage(text, type) {
        const message = document.getElementById('gameMessage');
        message.textContent = text;
        message.className = `game-message ${type}`;
        message.style.display = 'block';
        
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    }

    showStats() {
        const stats = this.getStats();
        document.getElementById('gamesPlayed').textContent = stats.gamesPlayed;
        document.getElementById('winPercentage').textContent = stats.winPercentage;
        document.getElementById('currentStreak').textContent = stats.currentStreak;
        document.getElementById('maxStreak').textContent = stats.maxStreak;
        document.getElementById('statsModal').style.display = 'block';
    }

    getStats() {
        const stats = JSON.parse(localStorage.getItem('tagalog-wordle-stats') || '{"gamesPlayed":0,"gamesWon":0,"currentStreak":0,"maxStreak":0}');
        
        if (this.gameOver && !stats.gameCompleted) {
            stats.gamesPlayed++;
            if (this.gameWon) {
                stats.gamesWon++;
                stats.currentStreak++;
                stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
            } else {
                stats.currentStreak = 0;
            }
            stats.gameCompleted = true;
            localStorage.setItem('tagalog-wordle-stats', JSON.stringify(stats));
        }
        
        stats.winPercentage = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
        return stats;
    }

    saveGameState() {
        const gameState = {
            currentWord: this.currentWord,
            currentRow: this.currentRow,
            currentCol: this.currentCol,
            gameOver: this.gameOver,
            gameWon: this.gameWon,
            guesses: this.guesses,
            date: new Date().toDateString()
        };
        localStorage.setItem('tagalog-wordle-state', JSON.stringify(gameState));
    }

    loadGameState() {
        const savedState = localStorage.getItem('tagalog-wordle-state');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            const today = new Date().toDateString();
            
            if (gameState.date === today && gameState.currentWord === this.currentWord) {
                this.currentRow = gameState.currentRow;
                this.currentCol = gameState.currentCol;
                this.gameOver = gameState.gameOver;
                this.gameWon = gameState.gameWon;
                this.guesses = gameState.guesses;
                
                // Restore grid
                for (let i = 0; i < this.guesses.length; i++) {
                    const guess = this.guesses[i];
                    for (let j = 0; j < 5; j++) {
                        const cell = document.getElementById(`cell-${i}-${j}`);
                        cell.textContent = guess[j];
                        cell.classList.add('filled');
                    }
                    this.checkGuess(guess);
                    this.updateKeyboard(guess);
                }
                
                // Restore current row
                if (!this.gameOver) {
                    for (let j = 0; j < this.currentCol; j++) {
                        const cell = document.getElementById(`cell-${this.currentRow}-${j}`);
                        if (cell.textContent) {
                            cell.classList.add('filled');
                        }
                    }
                }
            }
        }
    }
}

function closeStats() {
    document.getElementById('statsModal').style.display = 'none';
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TagalogWordle();
});
