import { auth, firestore } from "../../config/firebase";
import { doc, setDoc, collection, addDoc, updateDoc, arrayUnion, getDocs, query, where, arrayRemove, getDoc } from "firebase/firestore";
import { getUserByEmail } from "./user";

export async function createTeam(teamName) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const teamRef = await addDoc(collection(firestore, 'team'), {
            name: teamName,
            ownerId: user.uid,
            members: [user.uid]
        });

        const teamId = teamRef.id;

        await setDoc(doc(firestore, 'users', user.uid), {
            teamId: teamId
        }, { merge: true });

        return teamId;
    } catch (err) {
        console.error("Error creating team: ", err);
        throw new Error(err.message);
    }
}

export async function inviteMember(teamId, email) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const memberId = await getUserByEmail(email);

        if (!memberId) {
            throw new Error('User not found');
        }

        const teamRef = doc(firestore, 'team', teamId);
        await updateDoc(teamRef, {
            members: arrayUnion(memberId)
        });

        const userRef = doc(firestore, 'users', memberId);
        await updateDoc(userRef, {
            invitations: arrayUnion(teamId)
        });

        console.log(`User ${memberId} invited to team ${teamId}`);
    } catch (err) {
        console.error("Error inviting member: ", err);
        throw new Error(err.message);
    }
}

export async function kickMember(teamId, memberId) {
    try {
        const teamRef = doc(firestore, 'team', teamId);
        await updateDoc(teamRef, {
            members: arrayRemove(memberId)
        });

        console.log(`User ${memberId} kicked from team ${teamId}`);
    } catch (err) {
        console.error("Error kicking member: ", err);
        throw new Error(err.message);
    }
}

export async function getUserTeams() {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const userId = user.uid;

        const ownedTeamsQuery = query(collection(firestore, 'team'), where('ownerId', '==', userId));
        const ownedTeamsSnapshot = await getDocs(ownedTeamsQuery);
        const ownedTeams = ownedTeamsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const memberTeamsQuery = query(collection(firestore, 'team'), where('members', 'array-contains', userId));
        const memberTeamsSnapshot = await getDocs(memberTeamsQuery);
        const memberTeams = memberTeamsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const userRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userRef);
        const invitations = userDoc.data().invitations || [];

        return { ownedTeams, memberTeams, invitations };
    } catch (err) {
        console.error("Error getting user teams: ", err);
        throw new Error(err.message);
    }
}

export async function getTeamDetails(teamId) {
    try {
        const teamRef = doc(firestore, 'team', teamId);
        const teamDoc = await getDoc(teamRef);
        return { id: teamDoc.id, ...teamDoc.data() };
    } catch (err) {
        console.error("Error getting team details: ", err);
        throw new Error(err.message);
    }
}

export async function acceptInvite(teamId) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const userId = user.uid;

        const teamRef = doc(firestore, 'team', teamId);
        await updateDoc(teamRef, {
            members: arrayUnion(userId)
        });

        const userRef = doc(firestore, 'users', userId);
        await updateDoc(userRef, {
            invitations: arrayRemove(teamId)
        });

        console.log(`User ${userId} accepted invite to team ${teamId}`);
    } catch (err) {
        console.error("Error accepting invite: ", err);
        throw new Error(err.message);
    }
}

export async function declineInvite(teamId) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const userId = user.uid;

        const userRef = doc(firestore, 'users', userId);
        await updateDoc(userRef, {
            invitations: arrayRemove(teamId)
        });

        console.log(`User ${userId} declined invite to team ${teamId}`);
    } catch (err) {
        console.error("Error declining invite: ", err);
        throw new Error(err.message);
    }
}
