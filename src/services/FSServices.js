import app from './Base';
const db = app.firestore();

const FSServices = {
  async fetchOrgData(id) {
    return await db
      .collection('organizations')
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) console.log('Record Does Not Exist');
        else {
          const data = doc.data();
          data.id = id;
          return data;
        }
      });
  },
  async fetchOrgPrs(id) {
    const prCollection = [];

    const data = await db
      .collection('prs')
      .where('orgId', '==', id)
      .get();
    if (data.empty) {
      console.log('No PRs for this Organization');
      return;
    }

    data.forEach((doc) => {
      prCollection.push({ ...doc.data(), id: doc.id });
    });

    return prCollection;
  },
  async updatePr(id, pr) {
    return await db
      .collection('prs')
      .doc(id)
      .set(pr)
      .then((res) => res);
  },
  async addPr(pr) {
    let newID;
    await db
      .collection('prs')
      .add(pr)
      .then(async (doc) => {
        newID = doc.id;
        return await db
          .collection('prs')
          .doc(doc.id)
          .update({ id: doc.id });
      });
    const newPr = await this.fetchPr(newID);
    return newPr;
  },
  async fetchPr(id) {
    return await db
      .collection('prs')
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.id) console.log('PR does not exist');
        else {
          const data = doc.data();
          return data;
        }
      });
  },
  async registerOrg(email, password, orgData) {
    let org = await app.auth().createUserWithEmailAndPassword(email, password);
    let orgObj = {
      id: org.user.uid,
      ...orgData,
    };
    await db
      .collection('organizations')
      .doc(orgObj.id)
      .set(orgObj);
    return await this.fetchOrgData(orgObj.id);
  },
  async loginUser(email, password) {
    try {
      return await app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          return user.user.uid;
        })
        .catch((error) => {
          const err = {
            code: error.code,
            message: error.message,
          };
          return err;
        });
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateOrg(org) {
    try {
      return await db
        .collection('organizations')
        .doc(org.id)
        .set(org);
    } catch (err) {
      console.log(err);
    }
  },
};

export default FSServices;
