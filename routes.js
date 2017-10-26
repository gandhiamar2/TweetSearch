import express from 'express';
import main from './controlFiles/mainManager';
// import main from './controlFiles/mainManagerOld';
import hardcomponents from './controlFiles/hardcomponentController';
import components from './controlFiles/componentController';
import repoController from './controlFiles/repoController';
var router = express.Router();

router.get('/',main,(req,res)=>{
  res.send("working call")
})

router.get('/hardcomponents',hardcomponents.fetchAll);
router.get('/hardcomponents/:key',hardcomponents.fetch);
router.post('/hardcomponents',hardcomponents.insert);
router.delete('/hardcomponents/:position',hardcomponents.remove);

router.get('/components',components.fetchAll);
router.get('/components/:key',components.fetch);

router.get('/repos',repoController.fetchAll);
// router.get('/repos/:repo',repoController.fetch);
router.post('/repos',repoController.insert);
router.delete('/repos/:repo',repoController.remove);
router.put('/repos',repoController.update);


export default router;
