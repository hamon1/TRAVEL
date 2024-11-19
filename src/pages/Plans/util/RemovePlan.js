import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

const onRemove = async (planId) => {
    try {
      console.log(`Removing plan with id: ${planId}`); // Debug log
      await deleteDoc(doc(firestore(), 'plans', planId));
      const docToDelete = plan.find(p => p.id === planId);
    } catch (error) {
      console.error("Error removing plan: ", error);
    }
  };