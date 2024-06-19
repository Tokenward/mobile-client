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

export async function inviteMember(teamId, memberEmail) {
    try {
        const user = auth().currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const teamRef = firestore().collection('teams').doc(teamId);
        const teamDoc = await teamRef.get();

        if (!teamDoc.exists) {
            throw new Error('Team not found');
        }

        const teamData = teamDoc.data();
        if (teamData.ownerId !== user.uid) {
            throw new Error('Only the team owner can invite members');
        }

        const userQuerySnapshot = await firestore().collection('users').where('email', '==', memberEmail).get();
        if (userQuerySnapshot.empty) {
            throw new Error('User not found');
        }

        const memberDoc = userQuerySnapshot.docs[0];
        const memberId = memberDoc.id;

        await teamRef.update({
            members: firestore.FieldValue.arrayUnion(memberId)
        });

        return `User ${memberEmail} invited successfully`;
    } catch (error) {
        console.error("Error inviting member: ", error);
        throw new Error(error.message);
    }
}

export async function removeMember(teamId, memberId) {
    try {
        const user = auth().currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const teamRef = firestore().collection('teams').doc(teamId);
        const teamDoc = await teamRef.get();

        if (!teamDoc.exists) {
            throw new Error('Team not found');
        }

        const teamData = teamDoc.data();
        if (teamData.ownerId !== user.uid) {
            throw new Error('Only the team owner can remove members');
        }

        await teamRef.update({
            members: firestore.FieldValue.arrayRemove(memberId)
        });

        return `Member removed successfully`;
    } catch (error) {
        console.error("Error removing member: ", error);
        throw new Error(error.message);
    }
}