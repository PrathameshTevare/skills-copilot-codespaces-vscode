function skillsMember(){
    var member = {
        name: "John",
        age: 28,
        skills: ["JavaScript", "HTML", "CSS"],
        // Method
        showSkills: function(){
            this.skills.forEach(function(skill){
                console.log(skill);
            });
        }
    };

    return member;
}