class BsePage{

    constructor(page){

        this.page = page;
    }

    async navigate(path){
        await this.page.goto(path)
    }



    
}
module.exports = BsePage;