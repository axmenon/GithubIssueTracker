function findTotalOpenIssues(){var a,b=$("#url")[0].value;a=""!=$("#auth-token")[0].value?"https://api.github.com/repos/"+b.substring(0,b.lastIndexOf("/"))+"?access_token="+$("#auth-token")[0].value:"https://api.github.com/repos/"+b.substring(0,b.lastIndexOf("/")),$.ajax({type:"GET",url:a,dataType:"json",success:function(a){$("#totalOpenIssues")[0].innerHTML=a.open_issues},error:function(a){alert(a.responseText)}})}function makeAllAjaxRequests(a){$("#last24hours")[0].innerHTML=0,$("#last7days")[0].innerHTML=0,$("#earlierThanThat")[0].innerHTML=0;for(var b,c=$("#url")[0].value,d=(new Date((new Date).getTime()).toISOString(),new Date((new Date).getTime()-864e5).toISOString()),e=new Date((new Date).getTime()-6048e5).toISOString(),f=Math.floor(a/30),g=0;f>g;g++)b=""!=$("#auth-token")[0].value?"https://api.github.com/repos/"+c+"?page="+(g+1)+"&access_token="+$("#auth-token")[0].value:"https://api.github.com/repos/"+c+"?page="+(g+1),$.ajax({type:"GET",url:b,dataType:"json",success:function(a){$.grep(a,function(a){a.created_at>=d&&($("#last24hours")[0].innerHTML=parseInt($("#last24hours")[0].innerHTML)+1),a.created_at<d&&a.created_at>=e&&($("#last7days")[0].innerHTML=parseInt($("#last7days")[0].innerHTML)+1),$("#earlierThanThat")[0].innerHTML=parseInt($("#totalOpenIssues")[0].innerHTML)-(parseInt($("#last7days")[0].innerHTML)+parseInt($("#last24hours")[0].innerHTML))})},error:function(a){alert(a.responseText)}})}$("#trackButton").click(function(){findTotalOpenIssues(),0!==parseInt($("#totalOpenIssues")[0].innerHTML)&&makeAllAjaxRequests(parseInt($("#totalOpenIssues")[0].innerHTML))});