const guard = async fn => {
    try {
      return await fn();
    } catch (err) {
      return err;
    }
  };
  
module.exports = guard;
  