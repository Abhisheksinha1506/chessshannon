// lib/chess/encoder.ts using native Web Crypto API

export interface ChessEncoderConfig {
    sequenceLength?: number;
    separator?: string;
    useCustomMoves?: boolean;
}

/**
 * Canonical chess moves for encoding
 * ~256 moves providing vast combination space
 */
export const CANONICAL_MOVES = [
    // Pawn moves
    'a3', 'a4', 'a5', 'a6', 'b3', 'b4', 'b5', 'b6',
    'c3', 'c4', 'c5', 'c6', 'd3', 'd4', 'd5', 'd6',
    'e3', 'e4', 'e5', 'e6', 'f3', 'f4', 'f5', 'f6',
    'g3', 'g4', 'g5', 'g6', 'h3', 'h4', 'h5', 'h6',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',

    // Knight moves
    'Na3', 'Nc3', 'Nd2', 'Ne2', 'Nf3', 'Ng3', 'Nh3', 'Na6',
    'Nb4', 'Nc6', 'Nd7', 'Ne5', 'Nf6', 'Ng5', 'Nh4', 'Nb8',
    'Nd4', 'Nd5', 'Ne4', 'Nf4', 'Ng4', 'Nh5', 'Na5', 'Nb6',
    'Nc5', 'Ne7', 'Ng6', 'Nh7', 'Nb1', 'Ng1',

    // Bishop moves
    'Bc4', 'Bb5', 'Ba6', 'Bd3', 'Be2', 'Bf4', 'Bg5', 'Bh6',
    'Bf1', 'Bg2', 'Bh3', 'Ba3', 'Bb2', 'Bc1', 'Bd2', 'Be3',
    'Ba7', 'Bb8', 'Bc8', 'Bd8', 'Be7', 'Bf8', 'Bg8', 'Bh8',

    // Rook moves
    'Ra3', 'Ra4', 'Ra5', 'Ra6', 'Rd1', 'Re1', 'Rf1', 'Rg1',
    'Rc1', 'Rb1', 'Rh1', 'Rd3', 'Re3', 'Rf3', 'Rg3', 'Rh3',
    'Ra8', 'Rb8', 'Rc8', 'Rd8', 'Re8', 'Rf8', 'Rg8', 'Rh8',

    // Queen moves
    'Qd4', 'Qe2', 'Qf3', 'Qg4', 'Qh4', 'Qh5', 'Qa4', 'Qb3',
    'Qc2', 'Qd3', 'Qe4', 'Qf5', 'Qg6', 'Qh7', 'Qd2', 'Qe3',
    'Qa5', 'Qb6', 'Qc7', 'Qd8', 'Qe8', 'Qf8', 'Qg8', 'Qh8',

    // King moves
    'Kd2', 'Ke2', 'Kf1', 'Kg1', 'Kh1', 'Kf2', 'Kg2', 'Kh2',
    'Kd7', 'Ke7', 'Kf8', 'Kg8', 'Kh8',

    // Castling
    'O-O', 'O-O-O',

    // Common captures
    'exd5', 'exf5', 'dxe5', 'dxc5', 'cxd4', 'fxe5', 'gxf6', 'hxg5',
    'Bxf7', 'Nxe5', 'Nxd5', 'Qxd5', 'Rxe8', 'Bxe6', 'Nxc6', 'Qxh7',
    'axb5', 'bxa6', 'cxb5', 'Bxc6', 'Rxd8', 'Qxf7',

    // Checks
    'Qh4+', 'Bb5+', 'Nf6+', 'Rd8+', 'Bg5+', 'Qd8+', 'Rf7+', 'Ne7+',
    'Bc4+', 'Nc6+', 'Qe7+', 'Ra8+', 'Bh6+', 'Ng5+',

    // Promotions
    'e8=Q', 'a8=Q', 'h8=Q', 'd8=Q', 'e8=N', 'a8=N', 'h8=N',
    'b8=Q', 'c8=Q', 'f8=Q', 'g8=Q',

    // Advanced moves
    'Nd7', 'Nb8', 'Nc5', 'Ne5', 'Nf5', 'Ng6', 'Nh7', 'Qd7',
    'Qe7', 'Qf6', 'Qg7', 'Qa5', 'Qb6', 'Qc7', 'Ra7', 'Rb7',
    'Rc7', 'Rf7', 'Rg7', 'Rh7', 'Ba7', 'Bb6', 'Bc5', 'Bd6',
    'Be5', 'Bf6', 'Bg7', 'Bh8', 'Nf7', 'Nh6', 'Qf4', 'Qe5',

    // En passant  
    'exd6', 'dxe6', 'fxe6', 'exf6', 'dxc6', 'cxd6',
];

// Create reverse lookup
const MOVE_TO_INDEX = new Map<string, number>();
CANONICAL_MOVES.forEach((move, index) => {
    MOVE_TO_INDEX.set(move, index);
});

export const MOVE_BASE = CANONICAL_MOVES.length;
export const DEFAULT_SEQUENCE_LENGTH = 5;
export const MAX_SEQUENCE_LENGTH = 8;
export const MIN_SEQUENCE_LENGTH = 3;

/**
 * Chess Encoder class for URL shortening
 */
export class ChessEncoder {
    private config: Required<ChessEncoderConfig>;

    constructor(config: ChessEncoderConfig = {}) {
        this.config = {
            sequenceLength: config.sequenceLength || DEFAULT_SEQUENCE_LENGTH,
            separator: config.separator || '.',
            useCustomMoves: config.useCustomMoves || false,
        };
    }

    /**
     * Encode URL to chess move sequence using native Web Crypto
     */
    async encodeUrl(url: string): Promise<string> {
        const hash = await this.hashUrl(url);
        return this.hashToChessMoves(hash);
    }

    /**
     * Private: Hash URL to bigint using native Web Crypto
     */
    private async hashUrl(url: string): Promise<bigint> {
        const encoder = new TextEncoder();
        const data = encoder.encode(url);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer.slice(0, 8)));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return BigInt('0x' + hashHex);
    }

    /**
     * Decode chess moves to hash value
     */
    decodeChessMoves(moveSequence: string): bigint {
        const moves = moveSequence.split(this.config.separator);

        if (moves.length < MIN_SEQUENCE_LENGTH || moves.length > MAX_SEQUENCE_LENGTH) {
            throw new Error(`Invalid sequence length: ${moves.length}`);
        }

        let hashValue = BigInt(0);

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            const moveIndex = MOVE_TO_INDEX.get(move);

            if (moveIndex === undefined) {
                throw new Error(`Invalid chess move: ${move}`);
            }

            hashValue += BigInt(moveIndex) * (BigInt(MOVE_BASE) ** BigInt(i));
        }

        return hashValue;
    }

    /**
     * Validate chess move sequence
     */
    validateMoveSequence(sequence: string): boolean {
        const moves = sequence.split(this.config.separator);

        if (moves.length < MIN_SEQUENCE_LENGTH || moves.length > MAX_SEQUENCE_LENGTH) {
            return false;
        }

        return moves.every(move => MOVE_TO_INDEX.has(move));
    }

    /**
     * Get suggested alternative sequences
     */
    getSuggestions(baseSequence: string, count: number = 5): string[] {
        const suggestions: string[] = [];
        const baseMoves = baseSequence.split(this.config.separator);

        for (let i = 0; i < count; i++) {
            const newMoves = [...baseMoves];
            const randomIndex = Math.floor(Math.random() * MOVE_BASE);
            newMoves[newMoves.length - 1] = CANONICAL_MOVES[randomIndex];
            suggestions.push(newMoves.join(this.config.separator));
        }

        return suggestions;
    }

    /**
     * Private: Convert hash to chess moves
     */
    private hashToChessMoves(hash: bigint): string {
        const moves: string[] = [];
        let remaining = hash;

        for (let i = 0; i < this.config.sequenceLength; i++) {
            const moveIndex = Number(remaining % BigInt(MOVE_BASE));
            moves.push(CANONICAL_MOVES[moveIndex]);
            remaining = remaining / BigInt(MOVE_BASE);
        }

        return moves.join(this.config.separator);
    }

    /**
     * Calculate total combinations for given length
     */
    static calculateCombinations(sequenceLength: number): bigint {
        return BigInt(MOVE_BASE) ** BigInt(sequenceLength);
    }

    /**
     * Get statistics
     */
    static getStats(): Record<string, any> {
        const stats: Record<string, any> = {
            moveSetSize: MOVE_BASE,
            defaultLength: DEFAULT_SEQUENCE_LENGTH,
            combinations: {}
        };

        for (let len = 3; len <= 8; len++) {
            stats.combinations[`${len}_moves`] = this.calculateCombinations(len).toString();
        }

        return stats;
    }
}

// Export singleton instance
export const chessEncoder = new ChessEncoder();

/**
 * Utility: Check if sequence exists in database
 */
export async function isSequenceAvailable(
    sequence: string,
    supabase: any
): Promise<boolean> {
    const { data } = await supabase
        .from('shortened_urls')
        .select('chess_sequence')
        .eq('chess_sequence', sequence)
        .single();

    return !data;
}

/**
 * Utility: Get popular chess openings
 */
export async function getPopularOpenings(supabase: any): Promise<any[]> {
    const { data, error } = await supabase
        .from('chess_openings')
        .select('*')
        .eq('is_available', true)
        .order('popularity_score', { ascending: false })
        .limit(20);

    if (error) throw error;
    return data || [];
}
