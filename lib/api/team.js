import { auth } from "../../config/firebase";

export async function createTeam(teamName) {
    try {
        const user = auth().currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const teamRef = await firestore().collection('teams').add({
            name: teamName,
            ownerId: user.uid,
            members: [user.uid]
        });

        const teamId = teamRef.id;

        await firestore().collection('users').doc(user.uid).update({
            teamId: teamId
        });

        return teamId;
    } catch (error) {
        console.error("Error creating team: ", error);
        throw new Error(error.message);
    }
}

export async function getAllTeams() {
    try {
        const user = auth().currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const teamsQuerySnapshot = await firestore().collection('teams').where('members', 'array-contains', user.uid).get();
        
        const teams = [];
        teamsQuerySnapshot.forEach(doc => {
            teams.push({ id: doc.id, ...doc.data() });
        });

        return teams;
    } catch (error) {
        console.error("Error fetching teams: ", error);
        throw new Error(error.message);
    }
}