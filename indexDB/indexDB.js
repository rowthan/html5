(function(){  
    var dbObject = {};   
    dbObject.init = function(params){  
        this.db_name = params.db_name;  
        this.db_version = params.db_version;  
        this.db_store_name = params.db_store_name;  
        if (!window.indexedDB)   
        {  
            window.alert("����������֧��IndexDB,����������");  
        }  
  
        var request = indexedDB.open(this.db_name,this.db_version);  
        //������ʧ��  
        request.onerror = function(event)   
        {   
            alert("���ܴ����ݿ�,�������: " + event.target.errorCode);  
        };  
        request.onupgradeneeded = function(event)   
        {  
            this.db = event.target.result;   
            this.db.createObjectStore(dbObject.db_store_name);  
        };  
        //�����ݿ�  
        request.onsuccess = function(event)   
        {  
            //�˴������첽֪ͨ. ��ʹ��curd��ʱ����ͨ���¼�����  
            dbObject.db = event.target.result;  
        };  
    };  
    /** 
     * ���Ӻͱ༭����  
     */  
    dbObject.put = function(params,key)  
    {  
        //�˴�����ʽ��������  
        var transaction = dbObject.db.transaction(dbObject.db_store_name, "readwrite");  
        var store = transaction.objectStore(dbObject.db_store_name);  
        var request = store.put(params,key);  
        request.onsuccess = function(){  
            alert('��ӳɹ�');  
        };  
        request.onerror = function(event){  
            console.log(event);  
        }  
    };  
    /** 
     * ɾ������  
     */  
    dbObject.delete = function(id)  
    {  
        // dbObject.db.transaction.objectStore is not a function  
        request = dbObject.db.transaction(dbObject.db_store_name, "readwrite").objectStore(dbObject.db_store_name).delete(id);  
        request.onsuccess = function(){  
            alert('ɾ���ɹ�');  
        }  
    };  
  
    /** 
     * ��ѯ����  
     */  
    dbObject.select = function(key)  
    {  
        //�ڶ�����������ʡ��  
        var transaction = dbObject.db.transaction(dbObject.db_store_name,"readwrite");  
        var store = transaction.objectStore(dbObject.db_store_name);  
        if(key)  
            var request = store.get(key);  
        else  
            var request = store.getAll();  
  
        request.onsuccess = function () {  
            console.log(request.result);  
        }  
    };  
    /** 
     * �����������洢(��) 
     */  
    dbObject.clear = function()  
    {  
        var request = dbObject.db.transaction(dbObject.db_store_name,"readwrite").objectStore(dbObject.db_store_name).clear();  
        request.onsuccess = function(){  
            alert('����ɹ�');  
        }  
    };   
    window.dbObject = dbObject;  
})();  