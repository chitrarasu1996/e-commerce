import React from 'react'

const CreateCategoryForm= ({name,setName,hadleSubmit}) => {
  

  return (
   <>
 <form onSubmit={hadleSubmit}>
  <div class="mb-3 w-50">
  
    <input type="text" class="form-control" placeholder='Enter Category' onChange={(e)=>setName(e.target.value)} value={name}/>
   
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</>
  )
}

export default CreateCategoryForm