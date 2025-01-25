export default interface Candidate {
    readonly name: string | null;
    readonly login: string,
    readonly avatar_url: string,
    readonly company: string | null,
    readonly location: string | null,
    readonly bio: string | null,
    readonly hireable: boolean,
}